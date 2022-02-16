import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { FaSearch, FaUserAlt, FaUserInjured, FaUserMd, FaUsers } from "react-icons/fa"
import usuariosService from "../services/UsuariosServices"
import DropdownMenu from "./DropdownMenu"

export default function Usuarios(props) {

    let type = props.type
    const [dados, setDados] = useState([])
    const [columns, setColumns] = useState([])
    const [dadosSorted, setDadosSorted] = useState([{}]);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        if (type === 'atendentes') {
            setColumns([
                {
                    name: 'Nome',
                    selector: (row) => row.nome
                },
                {
                    name: 'CPF',
                    selector: (row) => row.cpf
                },
                {
                    name: 'Cidade',
                    selector: (row) => row.cidade
                },
                {
                    name: 'Carga Semanal',
                    selector: (row) => row.carga_semanal
                },
                {
                    name: 'Email',
                    selector: (row) => row.email
                }
            ])
            usuariosService.listarAtendentes().then((res) => setDados(res.data))
        }
        else if (type === 'medicos') {
            setColumns([
                {
                    name: 'Nome',
                    selector: (row) => row.nome
                },
                {
                    name: 'CRM',
                    selector: (row) => row.crm
                },
                {
                    name: 'Especialização',
                    selector: (row) => row.especializacao
                },
                {
                    name: 'Cidade',
                    selector: (row) => row.cidade
                },
                {
                    name: 'Carga Semanal',
                    selector: (row) => row.carga_semanal
                },
                {
                    name: 'Email',
                    selector: (row) => row.email
                }
            ])
            usuariosService.listarMedicos().then((res) => setDados(res.data))
        }
        else {
            setColumns([
                {
                    name: 'Nome',
                    selector: (row) => row.nome
                },
                {
                    name: 'CPF',
                    selector: (row) => row.cpf
                },
                {
                    name: 'Plano de Saude',
                    selector: (row) => row.plano_de_saude
                },
                {
                    name: 'Cidade',
                    selector: (row) => row.cidade
                },
                {
                    name: 'Email',
                    selector: (row) => row.email
                }
            ])
            usuariosService.listarPacientes().then((res) => setDados(res.data))
        }
    }, [type])


    function handleSearch(e) {
        let content = e.target.value;
        if (content.length !== 0) {
            setIsSearch(true)
            let searchResult = dados.reduce((aux, data) => {
                if (data.nome.toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setDadosSorted(searchResult)
        } else {
            setIsSearch(false)
        }

    }

    if (type === 'atendentes') {
        return (
            <div className="bg-white flex flex-col h-full justify-center items-center w-10/12">
                <div className="h-12 flex">
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
                </div>
                <h1 className="text-center text-2xl">Atendentes</h1>
                <div className='w-1/2 relative justify-center'>
                    <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearch} placeholder='Nome' />
                    <FaSearch className='absolute top-7 left-3' size='24px' />
                </div>
                <DataTable
                    columns={columns}
                    data={(isSearch ? dadosSorted : dados)}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>

        )

    }

    if (type === 'medicos') {

        return (
            <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">
                <div className="h-12 flex">
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
                </div>
                <h1 className="text-center text-2xl">Médicos</h1>
                <div className='w-full relative justify-center'>
                    <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearch} placeholder='Nome' />
                    <FaSearch className='absolute top-7 left-3' size='24px' />
                </div>
                <DataTable
                    columns={columns}
                    data={(isSearch ? dadosSorted : dados)}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>

        )

    }

    if (type === 'pacientes') {

        return (
            <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">
                <div className="h-12 flex">
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
                </div>
                <h1 className="text-center text-2xl">Pacientes</h1>
                <div className='w-full relative justify-center'>
                    <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearch} placeholder='Nome' />
                    <FaSearch className='absolute top-7 left-3' size='24px' />
                </div>
                <DataTable
                    columns={columns}
                    data={(isSearch ? dadosSorted : dados)}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>

        )
    }
}