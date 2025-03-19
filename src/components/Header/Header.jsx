import { Link } from "react-router-dom";

export function Header() {



    return(
        <header className="height-4r shadow-1 bg-color-1 p-1 flex align-center jus-around">
            <img className="height-100 " src="src\Components\Header\laly2.png" alt="" />
            <div className="color-1 flex jus-between column bold">
                <p>Telefono: 11 6148-9849 </p>                
                <p>Direccion: 5928 Jorge Santiago Bynnon</p>
            </div>
        </header>
    );
}