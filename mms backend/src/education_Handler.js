const {con}=require('../sql')

const createEducation=(res,payload)=>{
    const {degree,institute,starting_year,ending_year,email}=payload
    var query=`INSERT INTO Education VALUES("${degree}","${institute}","${starting_year}","${ending_year}","${email}");`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const getEducations=(res,email)=>{
    var query=`SELECT * FROM Education WHERE email="${email}";`
    con.query(query,(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
        res.send({result:result,error:error})
    })
}

const updateEducation=(res,payload)=>{
    let query=`SELECT * FROM Education WHERE email="${payload.email}" AND degree="${payload.degree}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
        let education=result[0];
        if(payload.starting_year)education.starting_year=payload.starting_year
        if(payload.ending_year)education.ending_year=payload.ending_year
        if(payload.institute)education.institute=payload.institute
        if(payload.degree)education.degree=payload.degree
        query=`UPDATE Education
        SET degree=${education.degree?`"${education.degree}"`:education.degree},
        starting_year=${education.starting_year?`"${education.starting_year}"`:education.starting_year},
        ending_year=${education.ending_year?`"${education.ending_year}"`:education.ending_year},
        institute=${education.institute?`"${education.institute}"`:education.institute}
        WHERE email="${payload.email}" AND degree="${payload.degree}" ;`
        con.query(query,(err,result)=>{
            if(err)
                console.log(err)
            res.send({error:err})
        })
    })
}
const deletEducation=(res,email,degree)=>{
    let query=`DELETE FROM Education WHERE email="${email}" AND degree="${degree}";`
    con.query(query,(error,result)=>{
        if(error)throw error;
    return res.json({status:"ok"})
        
    })
}

module.exports={createEducation,getEducations,updateEducation,deletEducation}