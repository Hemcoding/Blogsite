import knex from '../../config/dbconfig.js'
import roles from '../../validation/roles/roles.js'

const addRole = async(req,res)=>{
    try {
        roles.verifyRoles.validateAsync(req.body)

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

export default {
    addRole
}