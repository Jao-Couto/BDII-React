import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Funnel, FunnelChart, LabelList, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis } from "recharts"
import dashboardService from "../services/dashboardService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Dashboard(props) {

    const [graphData, setGraphData] = useState();
    const [graphData2, setGraphData2] = useState();
    const [graphData3, setGraphData3] = useState();
    const [graphData4, setGraphData4] = useState();
    const [totalPacientes, setTotalPacientes] = useState(0);
    const [totalAtendimentos, setTotalAtendimentos] = useState(0);
    const [totalSalarios, setTotalSalarios] = useState(0);

    useEffect(()=>{
        dashboardService.dadosDosRemedios().then(result => setGraphData(result.data));
        dashboardService.dadosDosPlanosDeSaude().then(result => setGraphData2(result.data));
        dashboardService.dadosDasUrgencias().then(result => setGraphData3(result.data));
        dashboardService.dadosDasEspecializacoes().then(result => setGraphData4(result.data));
        dashboardService.totalPacientes().then(result => setTotalPacientes(result));
        dashboardService.totalAtendimentosConcluidos().then(result => setTotalAtendimentos(result));
        dashboardService.totalGastosSalario().then(result => setTotalSalarios(result));
    },[])


    function cardData(str, data, sizeFont){
        if(str)
            return(
            <div className="w-full h-1/5 border border-b border-t-0 p-1">
                <p className="text-base font-bold h-1/3 text-left">{str}</p>
                <div className={`${sizeFont ? sizeFont : 'text-6xl'} font-bold h-2/3 text-center justify-center items-center flex`}>{data}</div>
            </div>
            )
    
        return(
            <div className={"w-full h-1/5 bg-gray-200"}></div>
            )
    
    }

    function drawGraphBar(data, dataKey, title){
        return(
            <div className="w-1/2">
                <ResponsiveContainer width="100%" height={250}>
                <BarChart width={730} height={250} data={data}>
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={dataKey} fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
                <p className="text-center text-lg font-bold">{title}</p>
            </div>
        )
    }

    function drawGraphRadar(data){
        return(
            <div className="w-1/2 flex items-center justify-center flex-col">
                <ResponsiveContainer width="100%" height={250}>
                <RadarChart outerRadius={90} width={500} height={250} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="nome" />
                    <PolarRadiusAxis angle={50} domain={[0, 8]}/>
                    <Radar name="Tipos de Urgencias" dataKey="total_usado" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
                </ResponsiveContainer>
                <p className="text-center text-lg font-bold">Proporção de Urgencias Totais</p>
            </div>
        )
    }

    if(graphData !== undefined && graphData2 !== undefined && graphData3 !== undefined && graphData4 !== undefined)
        return(
            <div className="flex w-full h-full">
                <aside className="h-full w-64 bg-white overflow-auto">
                    {cardData('Esse é o total de pacientes que temos cadastrados', totalPacientes)}
                    {cardData('Essa é a somatória de atendimentos concluidos', totalAtendimentos)}
                    {cardData('Esse é o nosso investimento em salarios', `R$ ${totalSalarios}`, 'text-4xl')}
                    {cardData()}
                    {cardData()}
                </aside>
                <main className="flex h-full w-full justify-center items-center flex-wrap p-24">
                    {drawGraphRadar(graphData3)}
                    {drawGraphBar(graphData4, "total_usado", 'Especializações')}
                    {drawGraphBar(graphData, "total_usado", 'Usos dos Remedios')}
                    {drawGraphBar(graphData2, "total_usado", 'Frequencia dos planos de saude')}
                </main>
            </div>
        );

    return(<div className="animate-spin"><AiOutlineLoading3Quarters size={48}/></div>)
}