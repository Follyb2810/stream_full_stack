class Apifeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }
filter(){
    let queryString=JSON.stringify(this.queryStr)
    queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
        const queryObj=JSON.parse(queryStr)
        this.query = this.query.find(queryObj)
        return this
}
sort(){
    if(this.queryStr.sort){
        const sortBy = this.queryStr.sort.split(',').join(' ')
        this.query =this.query.sort(sortBy)
    }else{
        this.query=this.query.sort('-createdAt')
    }
    return this;
}
limitfields(){
    if(this.queryStr.fields){
            //? query.select('name duration price rating)
            const fields = this.queryStr.fields.split(',').join(' ')
            this.query=this.query.select(fields)
        }else{
            query=query.select('-__v')
        }
        return this;
}
paginate(){
        const page = req.query.page*1 || 1
        const limit = req.query.limit*1 || 10
        const skip=(page -1) * limit
        this.query=this.query.skip(skip).limit(limit)

        // if(this.queryStr.page){
        //     const moviesCount= Movie.countDocuments()
        //     if(skip >= moviesCount){
        //         throw new Error('this page is not found')
        //     }
        // }
        return this;

}
}

module.export=Apifeatures