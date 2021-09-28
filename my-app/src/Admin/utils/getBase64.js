class ConvertIMG {
    static getBase64(file){
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            console.log("file k có", file);
            if (!file) {
                reader.onerror = error => reject(error);
                
            }
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
           
        });
    }
}
export default ConvertIMG;