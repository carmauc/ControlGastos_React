import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtro from './components/Filtro'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarID } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
function App() {
	const [gastos, setGastos] = useState(
		localStorage.getItem('gastos')
			? JSON.parse(localStorage.getItem('gastos'))
			: []
	)

	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto')) ?? 0
	)
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
	const [modal, setModal] = useState(false)
	const [animarModal, setAnimarModal] = useState(false)
	const [gastoEditar, setGastoEditar] = useState({})
	const [filtro, setFiltro] = useState('')
	const [gastosFiltrados, setGastosFiltrados] = useState([])

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true)
			setTimeout(() => {
				setAnimarModal(true)
			}, 600)
		}
	}, [gastoEditar])

	// useEffect para poner en local storage el presupuesto
	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto ?? 0)
	}, [presupuesto])

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
		if (presupuestoLS > 0) {
			setIsValidPresupuesto(true)
		}
	}, [])
	// useEffect para poner en local storage los gastos
	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
	}, [gastos])
	// useEffect para filtros
	useEffect(() => {
		if (filtro) {
			const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
			setGastosFiltrados(gastosFiltrados)
		}
	}, [filtro])
	const handleNuevoGasto = () => {
		setModal(true)
		setGastoEditar({}) // lo envio vacio para que cada vez que se le da al + aparezca asi
		setTimeout(() => {
			setAnimarModal(true)
		}, 600)
	}

	const eliminarGasto = id => {
		const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
		setGastos(gastosActualizados)
	}

	const guardarGasto = gasto => {
		if (gasto.id) {
			// actualizar
			const gastosActualizados = gastos.map(gastoState =>
				gastoState.id === gasto.id ? gasto : gastoState
			)
			setGastos(gastosActualizados)
			setGastoEditar({})
		} else {
			// Nuevo Gasto
			gasto.id = generarID()
			gasto.fecha = Date.now()
			setGastos([...gastos, gasto])
		}

		setAnimarModal(false)
		setTimeout(() => {
			setModal(false)
		}, 500)
	}
	return (
		<div className={modal ? 'fijar' : ''}>
			<Header
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>
			{isValidPresupuesto && (
				<>
					<main>
						<Filtro filtro={filtro} setFiltro={setFiltro} />
						<ListadoGastos
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>
					<div className='nuevo-gasto'>
						<img
							src={IconoNuevoGasto}
							alt='icono nuevo gasto'
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}
			{modal && (
				<Modal
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	)
}

export default App
