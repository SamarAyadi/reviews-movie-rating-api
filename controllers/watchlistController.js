const User = require('../models/user')

exports.add = async(req,res) =>{
    const{ movie, watched} = req.body
    const user = await User.findById(req.userId)
    const index= user.watchlist.findIndex(e => e.movie == movie )

    if(index > -1){
        user.watchlist[index].watched = watched
    }else{
        user.watchlist.push({ movie, watched})
    }
    await user.save()

    res.json({
        success: true
    })
}

exports.delete = async(req,res) =>{
    const {movie} = req.params
    const user= await User.findById(req.userId)
    user.watchlist=user.watchlist.filter(e=>e.movie != movie)
    await user.save()
    res.json({
        success: true
    })
}

exports.list = async(req,res) =>{
    const user = await User.findById(req.userId).select('-watchlist._id').populate('watchlist.movie',['name','category'])
    res.json({
        success: true,
        data:user.watchlist
    })
}