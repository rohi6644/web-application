const express=require('express');
const app=express();
const server = require('http').createServer(app);
const mysql = require('mysql');
const port = 8085;
const cors = require("cors");
app.use(cors());

const bodyParser=require('body-parser');

app.use(bodyParser.json());

app.use(cors());

let connection = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple'
})

connection.connect((err)=>{
    if(!err){
        console.log('Database Connected successfully');
        
    }else{
        console.log('Check the Database');
        console.log(err);
        
        
    }
})


//EXAM SEATING ARRANGMENT ALLOCATION PROCESS

app.post("/get-seating-arrangement", (req, res) => {
    const { selectedBranches, hallId, date, time } = req.body;

    if (!selectedBranches.length || !hallId || !date || !time) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const hallQuery = `SELECT * FROM hall WHERE hallId = ?`;
    connection.query(hallQuery, [hallId], (err, hallResults) => {
        if (err || hallResults.length === 0) {
            return res.status(500).json({ message: "Hall not found" });
        }

        const { rows, columns } = hallResults[0];
        let seatingMatrix = Array.from({ length: rows }, () => Array(columns).fill(null));

        const studentQuery = 
            `SELECT s.pin_no, s.branch 
            FROM student2 s
            WHERE s.branch IN (?) 
            AND NOT EXISTS (
                SELECT 1 FROM seating_allocation sa WHERE sa.pin_no = s.pin_no 
                AND sa.date = ? AND sa.time = ?
            )
            ORDER BY s.branch, s.pin_no`;

        connection.query(studentQuery, [selectedBranches, date, time], (err, students) => {
            if (err || students.length === 0) {
                return res.status(400).json({ message: "No students available" });
            }

            let branchQueues = {};
            let branchAllocatedCount = {}; // To store actual allocated student count

            selectedBranches.forEach(branch => {
                branchQueues[branch] = [];
                branchAllocatedCount[branch] = 0;
            });

            students.forEach(student => {
                branchQueues[student.branch].push(student);
            });

            function isSafeToSit(matrix, row, col, branch) {
                return !(
                    (row > 0 && matrix[row - 1][col]?.branch === branch) || 
                    (col > 0 && matrix[row][col - 1]?.branch === branch) ||
                    (row < rows - 1 && matrix[row + 1][col]?.branch === branch) ||
                    (col < columns - 1 && matrix[row][col + 1]?.branch === branch)
                );
            }

            let branchOrder = [...selectedBranches];
            let branchIndex = 0;
            let remainingStudents = Object.values(branchQueues).flat();

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    if (remainingStudents.length > 0) {
                        let foundStudent = null;
                        for (let i = 0; i < branchOrder.length; i++) {
                            let branch = branchOrder[(branchIndex + i) % branchOrder.length];
                            if (branchQueues[branch].length > 0) {
                                let student = branchQueues[branch][0];
                                if (isSafeToSit(seatingMatrix, r, c, student.branch)) {
                                    foundStudent = branchQueues[branch].shift();
                                    branchIndex = (branchIndex + 1) % branchOrder.length;
                                    branchAllocatedCount[branch]++; // Increment actual allocation count
                                    break;
                                }
                            }
                        }
                        seatingMatrix[r][c] = foundStudent;
                    }
                }
            }

            let finalSeating = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    let seat = seatingMatrix[r][c];
                    finalSeating.push(seat ? { row: r, col: c, ...seat } : { row: r, col: c, pin_no: null });
                }
            }

            const insertStudentQuery = `INSERT INTO seating_allocation (pin_no, branch, hallId, date, time) VALUES ?`;
            const studentValues = finalSeating
                .filter(student => student.pin_no)
                .map(student => [student.pin_no, student.branch, hallId, date, time]);

            const facultyQuery = 
                `SELECT id, faculty_name 
                FROM faculty 
                WHERE faculty_designation IN ('Senior Lecturer', 'Lecturer')
                AND id NOT IN (
                    SELECT faculty_id FROM faculty_allocation WHERE date = ? AND time = ?
                )
                ORDER BY id
                LIMIT 2`;

            connection.query(facultyQuery, [date, time], (err, facultyResults) => {
                if (err) {
                    return res.status(500).json({ message: "Database error while fetching faculty" });
                }

                if (facultyResults.length < 2) {
                    return res.status(400).json({ message: "Not enough available faculty for this hall" });
                }

                let facultyAllocation = facultyResults.map((faculty, index) => ({
                    hallId: hallId,
                    id: faculty.id,
                    faculty_name: faculty.faculty_name,
                    date: date,
                    time: time,
                    faculty_designation: index === 0 ? "Supervisor 1" : "Supervisor 2"
                }));

                const insertFacultyQuery = `INSERT INTO faculty_allocation (faculty_id, hallId, date, time, faculty_designation) VALUES ?`;
                const facultyValues = facultyAllocation.map(faculty => [faculty.id, hallId, date, time, faculty.faculty_designation]);

                if (studentValues.length > 0) {
                    connection.query(insertStudentQuery, [studentValues], (err) => {
                        if (err) {
                            console.error("Database error while saving student allocation:", err);
                            return res.status(500).json({ message: "Database error." });
                        }

                        connection.query(insertFacultyQuery, [facultyValues], (err) => {
                            if (err) {
                                console.error("Database error while saving faculty allocation:", err);
                                return res.status(500).json({ message: "Database error." });
                            }

                            res.status(200).json({
                                seating: finalSeating,
                                faculty: facultyAllocation,
                                rows: rows,
                                columns: columns,
                                branchCounts: branchAllocatedCount // Corrected count
                            });
                        });
                    });
                }
            });
        });
    });
});






//getting student details
app.get('/studentlist',(req,res)=>
    {
    connection.query('select * from student2 ',(err,row)=>{
        if(!err)
        {
            res.send(row);
        }
        else{
        res.send(err);
        }}
    )})

//hall details getting

app.get('/hallist',(req,res)=>
    {
    connection.query('select * from hall ',(err,row)=>{
        if(!err)
        {
            res.send(row);
        }
        else{
        res.send(err);
        }}
    )})

 //faculty details getting
 app.get('/facultylist',(req,res)=>
    {
    connection.query('select * from faculty ',(err,row)=>{
        if(!err)
        {
            res.send(row);
        }
        else{
        res.send(err);
        }}
    )})

//arrangement list
app.get('/viewlist',(req,res)=>
    {
    connection.query('select * from seating_allocation ',(err,row)=>{
        if(!err)
        {
            res.send(row);
        }
        else{
        res.send(err);
        }}
    )})


    app.delete("/clear-all", (req, res) => {
        connection.query("TRUNCATE TABLE seating_allocation", (err, result) => {
          if (err) {
            console.error("Error clearing all data:", err);
            res.status(500).json({ message: "Error clearing data" });
          } else {
            res.json({ message: "All data cleared successfully" });
          }
        });
      });
      

    app.post('/adminLogin', (req, res) => {
        console.log(req.body);
    
        connection.query('select * from admin where email = "' + req.body.email + '" and password = "' + req.body.password + '" ', (err, row) => {
            if (!err) {
                res.send(row);
            } else {
    
    
                res.send(err);
                console.log(err);
    
            }
        })
    
    })


    // API to fetch students based on selected branch
    app.get("/students", (req, res) => {
        const branch = req.query.branch;
        if (!branch) {
            return res.status(400).json({ error: "Branch is required" });
        }
    
        connection.query("SELECT * FROM student2 WHERE branch = ?", [branch], (err, results) => {
            if (!err) {
                res.send(results);
            } else {
                res.send(err);
            }
        });
    });
    



    // API to fetch students based on selected branch and year
    app.get("/year", (req, res) => {
        const { branch, year } = req.query;
    
        if (!branch || !year) {
            return res.status(400).json({ error: "Branch and Year are required" });
        }
    
        const sql = "SELECT * FROM student2 WHERE branch = ? AND year = ?";
        
        connection.query(sql, [branch, parseInt(year)], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({ error: "Database query failed" });
            } else {
                res.json(results);
            }
        });
    });
    
    

//ALLOCATION PROCESS




/*app.post('/student',(req, res) => {
    console.log(req.body);

    connection.query('insert into student(id,firstname,lastname,email,password,qualification,mobile,Role) values("' + req.body.id + '","' + req.body.firstname + '","' + req.body.lastname + '","' + req.body.email + '","' + req.body.password + '","' + req.body.qualification + '","' + req.body.mobile + '","' + req.body.role+ '")', (err,row) => {
   
        if (!err) {
            res.send(row);
            console.log('1 row inserted');
        } else {
            res.send(err);
        }
    })

})
app.post('/managers',(req,res) =>{
    console.log(req.body);

    connection.query('select * from manager where password = "'+req.body.password+'" and name = "'+req.body.name+'" ',(err,row)=>{
        if(!err){
            res.send(row);
        }else{
            res.send(err);
            console.log(err);
            
        }
    })
    
})
app.post('/admins',(req,res) =>{
    console.log(req.body);

    connection.query('select * from admin  where password = "'+req.body.password+'" and name = "'+req.body.name+'" ',(err,row)=>{
        if(!err){
            res.send(row);
        }else{
            res.send(err);
            console.log(err);
            
        }
    })
    
})
app.post('/employees',(req,res) =>{
    console.log(req.body);

    connection.query('select * from employee  where password = "'+req.body.password+'" and name = "'+req.body.name+'" ',(err,row)=>{
        if(!err){
            res.send(row);
        }else{
            res.send(err);
            console.log(err);
            
        }
    })
    
})


app.get('/details',(req,res)=>{
    console.log(req.body)
    connection.query('select * from student',(rows,err)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send(err);
            console.log(err);
            
        }
    }) 
})

app.get('/detail' ,(req,res)=>{
    connection.query("select * from student",(err,rows)=>{
        if(!err){
            res.send(rows);
        }
        else{
            res.send(err);
        }
    })
}
)
app.get('/singleid/:id',(req,res)=>
{
    connection.query('select * from student where id="'+req.params.id+'"',(err,row)=>{
        if(!err){
            res.send(row);
        }
        else{
            res.send(err);
        }
    })
})
app.post('/userupdate/:id',(req,res)=>{
    connection.query('update student set firstname="'+req.body.firstname+'" ,lastname="'+req.body.lastname+'",email="'+req.body.email+'",qualification="'+req.body.qualification+'" where id="'+req.params.id+'"',(row,err)=>{
        if(err)res.send(err);
        else res.send(row);
    })
})
app.post('/delrec/:id',(req,res)=>{
    connection.query('delete  from student where id="'+ req.params.id+'"',(err,row)=>
    {
    if(!err)
    {
        res.send(row);
    }
else{
    res.send(err);
}})
})

app.post('/manager',(req, res) => {
    console.log(req.body);

    connection.query('insert into manager(id,name,email,password,mobile,qualification,pervious_experience,date_of_join,department,role) values("' + req.body.id + '","' + req.body.name + '","' + req.body.email + '","'+req.body.password+'","' + req.body.mobile + '","' + req.body.qualification + '","' + req.body.pervious_experience+ '","' + req.body.date_of_join+ '","'+req.body.role+'","'+req.body.department+'")', (err,row) => {
   
        if (!err) {
            res.send(row);
            console.log('1 row inserted');
        } else {
            res.send(err);
        }
    })

})
app.post('/employee',(req, res) => {
    console.log(req.body);

    connection.query('insert into employee(id,name,email,mobile,password,designation,date_of_join,reported_to,gender,role) values("' + req.body.id + '","' + req.body.name + '","' + req.body.email + '","' + req.body.password + '","' + req.body.mobile + '","' + req.body.designation+ '","' + req.body.date_of_join+ '","'+req.body.reported_to+'","'+req.body.gender+'","'+req.body.role+'")', (err,row) => {
   
        if (!err) {
            res.send(row);
            console.log('1 row inserted')
        } else {
            res.send(err);
        }
    })

})
app.post('/admin',(req, res) => {
    console.log(req.body);

    connection.query('insert into admin(id,name,email,password,mobile,qualification,role) values("' + req.body.id + '","' + req.body.name + '","' + req.body.email + '","'+req.body.password+'","'+req.body.role+'","' + req.body.mobile + '","'+req.body.qualification+'")', (err,row) => {
   
        if (!err) {
            res.send(row);
            console.log('1 row inserted');
        } else {
            res.send(err);
        }
    })

})

app.get('/empdetails/:id', (req, res) => {
    console.log(req.body)
    connection.query('select * from employee  where id = "' + req.params.id + '" ', (err, row) => {
        if (!err) {
            res.send(row);
            console.log(row)

        } else {
            res.send(err);
            console.log(err);

        }
    })

})
app.get('/managerteam/:name',(req,res)=>{

connection.query('select * from employee where reported_to = "' + req.params.name + '" ', (err, row) => {
    if (!err) {
        res.send(row);
        console.log(row);
    }
    else {
        res.send(err);
        console.log(err);
    }
})
})






   
       

    app.get('/mandetails/:password', (req, res) => {
        console.log(req.body)
        connection.query('select * from manager  where password = "' + req.params.password+ '" ', (err, row) => {
            if (!err) {
                res.send(row);
                console.log(row)
    
            } else {
                res.send(err);
                console.log(err);
    
            }
        })
    
    })



    app.get('/empgetsingid/:id',(req,res)=>
        {
        connection.query('select * from employee where id="'+req.params.id+'"',(err,row)=>{
            if(!err)
            {
                res.send(row);
            }
            else{
            res.send(err);
            }}
        )})
    app.get('/mangetsngid/:id',(req,res)=>
        {
        connection.query('select * from manager where id="'+req.params.id+'"',(err,row)=>{
            if(!err)
            {
                res.send(row);
            }
            else{
            res.send(err);
            }}
        )})
    app.post('/mangetupdate/:id',(req,res)=>{
        connection.query('update manager set  name="'+req.body.name+'" ,department="' + req.body.department + '" ,salary="'+req.body.salary+'" where id="'+req.params.id+'"',(row,err)=>{
            if(err)res.send(err);
            else res.send(row);
        })
    })
    
    app.post('/empgetupdate/:id',(req,res)=>{
        connection.query('update employee set  name="'+req.body.name+'" ,designation="' + req.body.designation + '",salary="'+req.body.salary+'" where id="'+req.params.id+'"',(row,err)=>{
            if(err)res.send(err);
            else res.send(row);
        })
    })

    app.get('/mandetails' ,(req,res)=>{
        connection.query('select * from manager',(err,rows)=>{
            if(!err){
                res.send(rows);
            }
            else{
                res.send(err);
            }
            
        })
    }
    )
    
    app.get('/empdetail' ,(req,res)=>{
        connection.query('select * from employee',(err,rows)=>{
            if(!err){
                res.send(rows);
            }
            else{
                res.send(err);
            }
            
        })
    }
    )
    
    
    app.get('/employeerowcount', (req, res) => {


        connection.query('select count(*)  from employee', (err, row) => {
            if (!err) {
                res.send(row);
                console.log(row);
            }
            else {
                res.send(err);
            }
        })
    })
    
    
    app.get('/managerrowcount', (req, res) => {
    
    
        connection.query('select count(*)  from manager', (err, row) => {
            if (!err) {
                res.send(row);
                console.log(row);
            }
            else {
                res.send(err);
            }
        })
    })




     

    app.post('/mandelrec/:id',(req,res)=>{
        connection.query('delete  from manager where id="'+ req.params.id+'"',(err,row)=>
        {
        if(!err)
        {
            res.send(row);
        }
    else{
        res.send(err);
    }})
    })


    app.post('/empdelrec/:id',(req,res)=>{
        connection.query('delete  from employee where id="'+ req.params.id+'"',(err,row)=>
        {
        if(!err)
        {
            res.send(row);
        }
    else{
        res.send(err);
    }})
    })







    app.get('/singleid/:id',(req,res)=>
        {
        connection.query('select * from employee where id="'+req.params.id+'"',(err,row)=>{
            if(!err)
            {
                res.send(row);
            }
            else{
            res.send(err);
            }}
        )})
        
        app.get('/mansngid/:id',(req,res)=>
            {
            connection.query('select * from manager where id="'+req.params.id+'"',(err,row)=>{
                if(!err)
                {
                    res.send(row);
                }
                else{
                res.send(err);
                }}
            )})
        
           
            //update of man
        app.post('/manupdate/:id',(req,res)=>{
            connection.query('update manager set  name="'+req.body.name+'" ,date_of_join="'+req.body.date_of_join+'",email="'+req.body.email+'",pervious_experience="'+req.body.pervious_experience+'" ,mobile="' + req.body.mobile + '",department="' + req.body.department + '" ,salary="'+req.body.salary+'" where id="'+req.params.id+'"',(row,err)=>{
                if(err)res.send(err);
                else res.send(row);
            })
        })
        //update of emp
        app.post('/userupdate/:id',(req,res)=>{
            connection.query('update employee set  name="'+req.body.name+'" ,email="'+req.body.email+'",mobile="' + req.body.mobile + '",reported_to="'+req.body.reported_to+'" ,date_of_join="'+req.body.date_of_join+'",designation="' + req.body.designation + '",gender="'+req.body.gender+'" ,salary="'+req.body.salary+'" where id="'+req.params.id+'"',(row,err)=>{
                if(err)res.send(err);
                else res.send(row);
            })
        })  


        app.get('/users' ,(req,res)=>{
            connection.query("select * from manager",(err,rows)=>{
                if(!err){
                    res.send(rows);
                }
                else{
                    res.send(err);
                }
            })
        })
        app.get('/data' ,(req,res)=>{
            connection.query("select * from employee",(err,rows)=>{
                if(!err){
                    res.send(rows);
                }
                else{
                    res.send(err);
                }
            })
        })


        app.get('/singleid/:id',(req,res)=>
            {
            connection.query('select * from employee where id="'+req.params.id+'"',(err,row)=>{
                if(!err)
                {
                    res.send(row);
                }
                else{
                res.send(err);
                }}
            )})
            
            app.get('/mansngid/:id',(req,res)=>
                {
                connection.query('select * from manager where id="'+req.params.id+'"',(err,row)=>{
                    if(!err)
                    {
                        res.send(row);
                    }
                    else{
                    res.send(err);
                    }}
                )})
            
               
                //update of man
            app.post('/manupdate/:id',(req,res)=>{
                connection.query('update manager set  name="'+req.body.name+'" ,date_of_joining="'+req.body.date_of_joining+'",email="'+req.body.email+'",previous_experience="'+req.body.previous_experience+'" ,mobile="' + req.body.mobile + '",department="' + req.body.department + '" ,salary="'+req.body.salary+'" where id="'+req.params.id+'"',(row,err)=>{
                    if(err)res.send(err);
                    else res.send(row);
                })
            })




           //exam seating arrangment project






*/

  server.listen(port,()=>{
    console.log('Connection created Successfully on' +  port );
})