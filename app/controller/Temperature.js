import { convert } from '../service/TemperatureService'

export const TemperatureConvert = (req, res) => {
	let { value, unit, precision } = req.query

	let inspected_value = !isNaN(parseFloat(value)) && !isNaN(value - 0) ? value : null
	precision = !isNaN(parseFloat(precision)) && !isNaN(precision - 0) ? precision : 2

	if (!inspected_value) return res.status(404).send({ error: 'INVALID VALUE', data: { value: value } })

	let result = convert(inspected_value, unit, precision)

	if (result.code) return res.status(404).send({ error: result.code, data: result.data })

	return res.send(result)
}
