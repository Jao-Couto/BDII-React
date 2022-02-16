import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Funnel, FunnelChart, LabelList, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis } from "recharts"
import dashboardService from "../services/dashboardService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DropdownMenu from "./DropdownMenu";
import { FaUserAlt, FaUserInjured, FaUserMd, FaUsers } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Dashboard(props) {

    const [graphData, setGraphData] = useState();
    const [graphData2, setGraphData2] = useState();
    const [graphData3, setGraphData3] = useState();
    const [graphData4, setGraphData4] = useState();
    const [totalPacientes, setTotalPacientes] = useState(0);
    const [totalAtendimentosConcluidos, setTotalAtendimentosConcluidos] = useState(0);
    const [totalAtendimentosAndamento, setTotalAtendimentosAndamento] = useState(0);
    const [totalAtendimentosEspera, setTotalAtendimentosEspera] = useState(0);
    const [totalSalarios, setTotalSalarios] = useState(0);

    useEffect(() => {
        dashboardService.dadosDosRemedios().then(result => setGraphData(result.data));
        dashboardService.dadosDosPlanosDeSaude().then(result => setGraphData2(result.data));
        dashboardService.dadosDasUrgencias().then(result => setGraphData3(result.data));
        dashboardService.dadosDasEspecializacoes().then(result => setGraphData4(result.data));
        dashboardService.totalPacientes().then(result => setTotalPacientes(result));
        dashboardService.totalAtendimentosConcluidos().then(result => setTotalAtendimentosConcluidos(result));
        dashboardService.totalAtendimentosAndamento().then(result => setTotalAtendimentosAndamento(result));
        dashboardService.totalAtendimentosEspera().then(result => setTotalAtendimentosEspera(result));
        dashboardService.totalGastosSalario().then(result => setTotalSalarios(result));
    }, [])


    function cardData(str, data, sizeFont) {
        if (str)
            return (
                <div className="w-full h-1/5 border border-b border-t-0 p-1">
                    <p className="text-base font-bold h-1/3 text-left">{str}</p>
                    <div className={`${sizeFont ? sizeFont : 'text-6xl'} font-bold h-2/3 text-center justify-center items-center flex truncate`}>{data}</div>
                </div>
            )

        return (
            <div className={"w-full h-1/5 bg-gray-200"}></div>
        )

    }

    function drawGraphBar(data, dataKey, title) {
        return (
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

    function drawGraphRadar(data) {
        let maxLimitRadar = (Math.max(...data.map((a) => a.total)));
        return (
            <div className="w-1/2 flex items-center justify-center flex-col">
                <ResponsiveContainer width="100%" height={250}>
                    <RadarChart outerRadius={90} width={500} height={250} data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="nome" />
                        <PolarRadiusAxis angle={50} domain={[0, maxLimitRadar]} />
                        <Radar name="Tipos de Urgencias" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
                <p className="text-center text-lg font-bold">Proporção de Urgencias Totais</p>
            </div>
        )
    }

    if (graphData !== undefined && graphData2 !== undefined && graphData3 !== undefined && graphData4 !== undefined)
        return (
            <div className="flex w-full h-full relative">
                <div className="h-12 absolute top-5 left-64 flex">
                    <DropdownMenu
                        id="usuarios"
                        name="Usuarios"
                        icon={<FaUsers size="24" />}
                        styles="min-w-navbar-btn"
                        options={[
                            { name: "Atendentes", route: "/usuarios/atendentes", icon: <FaUserAlt size="18" /> },
                            { name: "Médicos", route: "/usuarios/medicos", icon: <FaUserMd size="18" /> },
                            { name: "Paciente", route: "/usuarios/pacientes", icon: <FaUserInjured size="18" /> }
                        ]}
                    />
                    <Link to="/historicoAtendimento" style={{ textDecoration: "none" }}>
                        <Button name="Histórico de Atendimentos" icon={<MdHistory size="24" />} id="historicoAtendimento" styles="min-w-navbar-btn" />
                    </Link>
                </div>
                <aside className="h-full w-64 bg-white overflow-auto">
                    {cardData('Pacientes cadastrados', totalPacientes)}
                    {cardData('Atendimentos em espera', totalAtendimentosEspera)}
                    {cardData('Atendimentos em andamento', totalAtendimentosAndamento)}
                    {cardData('Atendimentos concluidos', totalAtendimentosConcluidos)}
                    {cardData('Investimento em salarios', `R$ ${totalSalarios}`, 'text-4xl')}

                </aside>
                <main className="flex h-full w-full justify-center items-center flex-wrap p-24">
                    {drawGraphRadar(graphData3)}
                    {drawGraphBar(graphData4, "total_usado", 'Especializações')}
                    {drawGraphBar(graphData, "total_usado", 'Usos dos Remedios')}
                    {drawGraphBar(graphData2, "total_usado", 'Frequencia dos planos de saude')}
                </main>
            </div>
        );

    return (<div className="animate-spin"><AiOutlineLoading3Quarters size={48} /></div>)
}