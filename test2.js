import bcrypt from "bcrypt";

const arr =[ {email: "oak", pass: bcrypt.hashSync("pass", 10)}];

// console.log(JSON.stringify(arr));


const info = [ {movie: "dinosaur" }, {movie: "penguins"}];








const loginController = async(email, pass, movie)=>{
    try{
       

        if(!email || !pass) return {success:false, message:"Empty email and password"};

        const user = await arr.find(u=>u.email === email);

     
        if(!user) return {success: false, message: "No user found"};


         const isMatch = await bcrypt.compare(pass,user.pass);

        if(!isMatch) return {success: false, message: "Invalid credential"};


           const infos = await info.find(m=>m.movie == movie);

           if(!infos) return {success:true, message: "login Success", info:"no movie found"}
        return {success:true, message: "Login success", info: infos.movie};
     
       

       

    }catch(err){
        console.error("Error");

    }
}
// loginController();

async function login(){
    const email= "oak";
    const pass = "pass";
    const movie="penguins";

    const res=  await loginController(email,pass,movie);

    console.log(res.message);
    console.log(res.info);
}
login();





    