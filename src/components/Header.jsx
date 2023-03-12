import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'
const Header = ({
	gastos,
	setGastos,
	presupuesto,
	setPresupuesto,
	isValidPresupuesto,
	setIsValidPresupuesto,
}) => {
	return (
		<header>
			<h1>Planificador de Gastos</h1>

			{isValidPresupuesto ? (
				<ControlPresupuesto
					presupuesto={presupuesto}
					gastos={gastos}
					setGastos={setGastos}
					setPresupuesto={setPresupuesto}
					setIsValidPresupuesto={setIsValidPresupuesto}
				/>
			) : (
				<NuevoPresupuesto
					presupuesto={presupuesto}
					setPresupuesto={setPresupuesto}
					isValidPresupuesto={isValidPresupuesto}
					setIsValidPresupuesto={setIsValidPresupuesto}
				/>
			)}
		</header>
	)
}

export default Header
