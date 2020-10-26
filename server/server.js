const express = require("express")

const bodyParser = require("body-parser")
const Sequelize = require("sequelize")

const cors = require("cors")

const sequelize = new Sequelize('homework_database', 'root1', 'p@ss', {
    dialect: 'mysql'
})

let Pachet = sequelize.define('packet',{
    numePachet:{
        type: Sequelize.STRING
    },
    numarConturi:{
        type: Sequelize.INTEGER
    }
})

let Beneficiu = sequelize.define('benefit',{
    numeBeneficiu:{
        type: Sequelize.STRING
    },
    descriereBeneficiu:{
        type: Sequelize.STRING
    }
})


let User = sequelize.define('userdata', {
    numeClient: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prenumeClient: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailClient: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipClient: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataPlata:{
        type: Sequelize.DATEONLY                   
    },
    dataIncheiere:{
         type: Sequelize.DATEONLY  
    }

})

let Account = sequelize.define('account', {
    numeInsta:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

let Event = sequelize.define('event',{
    varstaMin:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    varstaMax:{
        type: Sequelize.STRING,
        allowNull: false
    },
    startDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    startHour:{
        type: Sequelize.INTEGER
    },
    endDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    endHour:{
        type: Sequelize.INTEGER
    }
})

let Hashtag = sequelize.define('hashtag',{
    hashtag:{
        type:Sequelize.STRING
    }
        
    })
    
User.hasMany(Account)
Account.hasMany(Event)
Event.hasMany(Hashtag)
Pachet.hasMany(Beneficiu)
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.post('/sync', async(req, res, next) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })


    }
    catch (err) {
        next(err)


    }


})

app.get('/packets', async(req, res, next) => {
    try {
        let pachete = await Pachet.findAll()
        res.status(200).json(pachete)


    }
    catch (err) {
        next(err)


    }

})
app.post('/packets', async(req, res, next) => {
    try {
        await Pachet.create(req.body)
        res.status(201).json({ message: 'created' })


    }
    catch (err) {

        next(err)

    }
})

app.get('/packets/:id', async(req, res, next) => {
    try {
        let pachet = await Pachet.findByPk(req.params.id)
        if (pachet) {
            res.status(200).json(pachet)
        }
        else {
            res.status(404).json({ message: 'not found' })
        }

    }
    catch (err) {
        next(err)
    }
})

app.put('/packets/:id', async(req, res, next) => {
    try {
        let packet = await Pachet.findByPk(req.params.id)
        if (packet) {
            await packet.update(req.body)
            res.status(200).json({ message: 'accepted' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }

    }
    catch (err) {
        next(err)
    }

})

app.delete('/packets/:id', async(req, res, next) => {
    try {
        let pachet = await Pachet.findByPk(req.params.id)
        if (pachet) {
            await pachet.destroy()
            res.status(200).json({ message: 'accepted' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }

    }
    catch (err) {
        next(err)
    }
})

app.get('/packets/:bid/benefits', async(req, res, next) => {
    try {
        let pachet = await Pachet.findByPk(req.params.bid, {
            include: [Beneficiu]
        })
        if (pachet) {
            res.status(200).json(pachet.benefits)

        }
        else {
            res.status(404).json({ message: 'not found' })
        }


    }
    catch (err) {
        next(err)
    }




})
app.post('/packets/:bid/benefits', async(req, res, next) => {

    try {
        let pachet = await Pachet.findByPk(req.params.bid)
        if (pachet) {
            let benefit = req.body
            benefit.packetId = pachet.id
            let benefits = await pachet.getBenefits({
                where: {
                    id: req.params.bid
                }

            })
           
            await Beneficiu.create(benefit)
            res.status(201).json({ message: 'created' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (err) {
        next(err)
    }
})



app.get('/userdata', async(req, res, next) => {
    try {
        let users = await User.findAll()
        res.status(200).json(users)


    }
    catch (err) {
        next(err)


    }

})
app.post('/userdata', async(req, res, next) => {
    try {
        await User.create(req.body)
        res.status(201).json({ message: 'created' })


    }
    catch (err) {

        next(err)

    }
})

app.get('/userdata/:id', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.id)
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: 'not found' })
        }

    }
    catch (err) {
        next(err)
    }
})

app.put('/userdata/:id', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.id)
        if (user) {
            await user.update(req.body)
            res.status(200).json({ message: 'accepted' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }

    }
    catch (err) {
        next(err)
    }

})

app.delete('/userdata/:id', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.id)
        if (user) {
            await user.destroy()
            res.status(200).json({ message: 'accepted' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }

    }
    catch (err) {
        next(err)
    }
})


app.get('/userdata/:bid/accounts', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.bid, {
            include: [Account]
        })
        if (user) {
            res.status(200).json(user.accounts)

        }
        else {
            res.status(404).json({ message: 'not found' })
        }


    }
    catch (err) {
        next(err)
    }




})
app.post('/userdata/:bid/accounts', async(req, res, next) => {

    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let account = req.body
            account.userdatumId = user.id
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.bid
                }

            })
           
            await Account.create(account)
            res.status(201).json({ message: 'created' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (err) {
        next(err)
    }
})


app.get('/userdata/:bid/accounts/:did', async(req, res, next) => {

    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                res.status(200).json(account)
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })

        }

    }
    catch (err) {
        next(err)
    }
})

app.delete('/userdata/:bid/accounts/:did', async(req, res, next) => {
     try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                await account.destroy()
                res.status(200).json({message: 'accepted'})
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })

        }

    }
    catch (err) {
        next(err)
    }
            
        
        
})

app.get('/userdata/:bid/accounts/:did/events', async(req, res, next) => {

    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                let events = await account.getEvents()

                res.status(200).json(events)
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })

        }

    }
    catch (err) {
        next(err)
    }
})

app.post('/userdata/:bid/accounts/:did/events', async(req, res, next) => {

    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            let event = req.body
            event.accountId = account.id

            await Event.create(event)
            res.status(201).json({ message: 'created' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (err) {
        next(err)
    }
})
app.get('/userdata/:bid/accounts/:did/events/:cid', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                let events = await account.getEvents({
                    where: {
                        id: req.params.cid
                    }

                })
                let event = events.shift()
                if (event) {
                    
                    res.status(200).json(event)
                }

            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })

        }

    }
    catch (err) {
        next(err)
    }

})
app.put('/userdata/:bid/accounts/:did/events/:cid', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                let events = await account.getEvents({
                    where: {
                        id: req.params.cid
                    }

                })
                let event = events.shift()
                if (event) {
                    await event.update(req.body, {
                        fields: ['endDate','endHour']
                    })
                    res.status(202).json({ message: 'accepted' })
                }

            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })

        }

    }
    catch (err) {
        next(err)
    }

})

app.get('/userdata/:bid/accounts/:did/events/:sid/hashtags', async(req, res, next) => {

    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                let events = await account.getEvents({
                where: {
                    id: req.params.sid
                }})
                let event = events.shift()
                if(event){
                let hashtags = await event.getHashtags()
                res.status(200).json(hashtags)
                    
                }
            }
            else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })

        }

    }
    catch (err) {
        next(err)
    }
})

app.post('/userdata/:bid/accounts/:did/events/:sid/hashtags', async(req, res, next) => {

    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if(account){
                let events = await account.getEvents({
                    where: {
                        id: req.params.sid
                    }

                })
                let event = events.shift()
        if (event) {
            
            let hashtag = req.body
            hashtag.eventId = event.id

            await Hashtag.create(hashtag)
            res.status(201).json({ message: 'created' })

            
        }
                
            }
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (err) {
        next(err)
    }
})
app.delete('/userdata/:bid/accounts/:did/events/:cid/hashtags/:sid', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.bid)
        if (user) {
            let accounts = await user.getAccounts({
                where: {
                    id: req.params.did
                }

            })
            let account = accounts.shift()
            if (account) {
                let events = await account.getEvents({
                    where: {
                        id: req.params.cid
                    }

                })
                let event = events.shift()
        if (event) {
            let hashtags = await event.getHashtags({
                    where: {
                        id: req.params.sid
                    }

                })
                let hashtag = hashtags.shift()
                if(hashtag){
            await hashtag.destroy()
            res.status(200).json({ message: 'accepted' })
                    
                }
                else {
            res.status(404).json({ message: 'not found' })
        }
        }
        

    }
            
        }
        
    }
    catch (err) {
        next(err)
    }
})


app.listen(8080)