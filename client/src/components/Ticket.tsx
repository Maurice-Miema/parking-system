import { useRef } from "react";

interface TicketProps {
    data: any;
    close: ()=> void;
}

function Ticket({ data, close }:TicketProps ) {
    const ticketRef = useRef<HTMLDivElement>(null);
    if(!data) return null;

    // Fonction d’impression
    const handlePrint = () => {
        if (ticketRef.current) {
            const printContent = ticketRef.current.innerHTML;
            const originalContent = document.body.innerHTML;
        
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        }
    };
    return (
        <div className="md:w-xl gap-2 grid">
            <div 
                ref={ticketRef}
                className='p-6 border rounded-md shadow-lg bg-white'
            >
                <div className='flex justify-between mb-4'>
                    <h2 className="md:text-xl font-bold">Ticket de Parking</h2>
                    <h1 className='md:text-2xl font-semibold text-emerald-500'>Maugus-Parking</h1>
                </div>

                <div className='flex justify-between md:gap-0 gap-4 items-center mb-4'>
                    <div>
                        <h1 className="inline-block md:text-4xl text-2xl font-bold relative">
                            <span className="absolute left-0 bottom-2 w-full h-5 bg-emerald-300 -rotate-12 rounded-lg"></span>
                            <span className="relative z-10"> {data.code} </span>
                        </h1>
                        <h1 className='mt-2'> {new Date(data.dateEntree).toLocaleString()} </h1>
                    </div>

                    <div>
                        <p> <strong> {data.proprietaire.nom} {data.proprietaire.postnom} {data.proprietaire.prenom} </strong> </p>
                        <p>{data.proprietaire.email}</p>
                        <p> {data.type} <strong> {data.plaque} </strong> </p>
                    </div>
                </div>
                <hr />
                <div className='mt-2'>
                    <h1> <strong> contact : </strong> maugus-parking@gmail.com  </h1>
                </div>
            </div>

            <div className='border flex justify-between rounded-md shadow-lg bg-white px-6 py-2'>
                <div>
                    <button 
                        type="button"
                        onClick={close}
                        className="py-2 px-8 text-white rounded-md bg-red-400 cursor-pointer hover:bg-red-500"
                    >
                        Annuler
                    </button>
                </div>
                
                <div>
                    <button 
                        type="button"
                        onClick={handlePrint}
                        className='bg-emerald-600 hover:bg-emerald-700 font-medium px-4 py-2 text-white rounded-md cursor-pointer'
                    >
                        Imprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ticket
