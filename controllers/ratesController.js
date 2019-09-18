const mongoose = require("mongoose");
const Rate = mongoose.model("Rate");
const User = mongoose.model('User');


const recalculateRate = async rate_for => {
  Rate.find({rate_for})
       .then(rates => {
         const total = rates.length;
         let rateSum = 0;
         rates.forEach(rate => {
           //console.log(rate, rate.rate);
           rateSum += +rate.rate
         })
         const averigeRate = rateSum / total;
         console.log('totalAverage', averigeRate, rateSum, total);
         User.findByIdAndUpdate(rate_for,{rate: averigeRate.toFixed(2)})
             .then(ats => {
             }).catch(err=>{console.log(err)})
       })
       .catch(err => {
         console.log('errorCalculating', err);
       })
}

const createRate = async (req, res , next) => {console.log('createRate')

  const { message_thread_id, message, rate_for, rate } = req.body;

  const data = {
    message_thread_id,
    message,
    rate,
    rate_for,
    rate_from: req.user._id
  }

  Rate.create(data).then(ats => {
    recalculateRate(rate_for);
    res.send(ats);
  })
  .catch(err => {
    res.status(400).send(err);
  })
  console.log('createRate', data)
}

const indexRates = async (req, res, next) => {

  const { rate_for } = req.params
  Rate.find({rate_for})
      .populate('rate_from', 'name email')
      .then(rates => {
        res.send(rates)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  
}

module.exports = {
                  createRate,
                  indexRates
                }