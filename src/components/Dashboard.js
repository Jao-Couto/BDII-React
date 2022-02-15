import { useEffect, useState } from "react"

export default function Dashboard(props) { 
    if(props.dados.length === 0){
        return <div></div>
    }
    
    let result
    switch (props.tipo) {
        case "medico":
            let data = props.dados
            const carga_hor = data.map((elem)=> {
                return elem.carga_semanal
            })
            const espec = data.map((elem)=> {
                return elem.especializacao
            })
            console.log(espec);
            
            result = (
            <div id="dashboard" className="w-full grid justify-items-center grid-cols-5 md:grid-cols-3 gap-4 my-5">
                <div className="h-40 w-40 bg-red-300 rounded-lg p-3">
                    <div className="font-semibold ">Quantidades</div> 
                    <div className="mt-2">Total médicos: {data.length}</div>

                </div>
                <div className="h-40 w-40 bg-blue-300 rounded-lg p-3">
                    <div className="font-semibold ">Carga Horária</div>
                    <div className="mt-2">
                        Média: {Math.ceil(carga_hor.reduce((prev, cur, _, array) => {
                            return prev + (cur/array.length)
                        }))}
                    </div>
                    <div>
                        Mediana: {carga_hor[Math.ceil(carga_hor.length/2)-1]}
                    </div>
                </div>
                <div className="h-40 w-40 bg-green-300 rounded-lg p-3">
                    <div className="font-semibold ">Especialização</div>
                    <div className="mt-2"> Quantidade de diferentes: {new Set(espec).size}</div>
                </div>
            </div>
            )
            break
        case "paciente":
            result = (
                <div id="dashboard" className="w-full grid grid-cols-5 md:grid-cols-3 gap-4 my-5">
                    <div className="h-40 w-40 bg-red-300 rounded-lg p-3">
                        <div className="font-semibold ">Quantidades</div> 
                        <div className="mt-2">Total médicos: {data.length}</div>
                    </div>
                    <div className="h-40 w-40 bg-blue-300 rounded-lg p-3">
                        <div className="font-semibold ">Carga Horária</div>
                        
                    </div>
                    <div className="h-40 w-40 bg-green-300 rounded-lg p-3">
                        <div className="font-semibold ">Especialização</div>
                        
                    </div>
                </div>
                )
                break
        default:
        break

    }
    return (result)
}