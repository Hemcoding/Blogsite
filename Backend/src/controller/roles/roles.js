import knex from '../../config/dbconfig.js'
import roles from '../../validation/roles/roles.js'

const addRole = async(req,res)=>{
    try {
       const {error} =  roles.verifyRoles.validate(req.body)
        if(error){
            return res.json({
                Error:true,
                Message:error.message
            })
         }

        const {name} = req.body

        const data = {
            name : name,
            status :"NO"
        }

        const rolesInserted = await knex('roles').insert(data)

        if(!rolesInserted){
            return res.json({
                Error : true,
                Message :"No roles inserted"
            })
        }

        return res.json({
            Error : false,
            Message :"Role has been inserted",
            Data:rolesInserted
        })

    } catch (error) {
        return res.json({
            Error:true,
            Message:error.message
        })
    }

}

const showRoles = async(req,res)=>{
    try {
        const data = await knex('roles').select('role_id','name')

        if(data.length == 0){
            return res.json({
                Error : false,
                Message :"No data"
            })
        }

        res.json({
            Error :false,
            Message:"Data has been fetched",
            Data:data
        })
    } catch (error) {
        return res.json({
            Error:true,
            Message:error.message
        }) 
    }
}

export default {
    addRole,
    showRoles
}