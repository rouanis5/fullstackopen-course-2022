const mongoose = require('mongoose')

const password = process.argv[2]
const pName = process.argv[3]
const pNumber = process.argv[4]


const url = `mongodb+srv://rouanis5:${password}@cluster0.uummahd.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url)

if (pName && pNumber){
  new Person({
    name: pName,
    number: pNumber
  }).save()
  .then(()=>{
    console.log(`added ${pName} number ${pNumber} to phonebook`);
    return mongoose.connection.close()
  })
}
else {
  Person.find({})
  .then((res)=>{
    console.log('phonebook:');
    res.forEach(({name, number}) => {
      console.log(`${name} ${number}`);
    })
    return mongoose.connection.close()
  })
}