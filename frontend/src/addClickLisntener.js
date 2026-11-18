const addClickLisntener = (selector,callback)=>{
    document.addEventListener( "click",(e)=>{
        if(e.target.id === selector){
            callback(e)
        }
    })
}

export default addClickLisntener;