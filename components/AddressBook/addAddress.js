const db = require('../../database/database')

module.exports = (req,res)=>{

    db.AddressBook.create({
        UserId:               req.body.UserId,
        AdressType:           req.body.AdressType,
        RecipientName:        req.body.RecipientName,
        RecipientMobile:      req.body.RecipientMobile,
        StreetAdress:         req.body.StreetAdress,
        GeographicalFeature:  req.body.GeographicalFeature,
        Suburb:               req.body.Suburb,
        City:                 req.body.City,
        Province:             req.body.Province,
        PostalCode:           req.body.PostalCode   
    }).then(response=>{
        res.status(200).send(response)
    }).catch((err)=>{
           res.status(400).send(err)     
    })

}