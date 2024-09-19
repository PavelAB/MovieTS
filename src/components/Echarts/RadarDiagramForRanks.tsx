import * as echarts from "echarts"
import { useEffect} from "react"
import { Rating } from "../../types/Rating"

type EChartsOption = echarts.EChartsOption


interface RadarDiagramProps {
    rangs: Rating[],
}


const RadarDiagramForRank: React.FC<RadarDiagramProps> = ({ rangs }) => {

    console.log(rangs)


    useEffect(() => {
        const myChart = echarts.init(document.getElementById("test"))
        let option: EChartsOption

        option = {
            title: {
                show: false

            },
            legend: {
                data: ['Average rates']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: "Actor's Performance", max: 10 },
                    { name: 'Scenario Quality', max: 10 },
                    { name: 'Cinematic Quality', max: 10 },
                    { name: 'Sound Quality', max: 10 }
                ],
                axisName: {
                    show: true,
                    overflow: "none"
                }
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                            value: [1, 2, 3, 4],
                            name: 'Average rates'
                        }
                    ]
                }
            ]
        };



        // Returns the number of elements to display based on the screen size.
        const updateNomberOfElementDisplayed = (): void => {
            myChart.setOption(option)
            myChart.resize()
        }

        updateNomberOfElementDisplayed()
        window.addEventListener('resize', updateNomberOfElementDisplayed)




        return () => {
            myChart.dispose()
            window.removeEventListener('resize', updateNomberOfElementDisplayed)
        }
    }, [])


    return (
        <div id={"test"} className={`w-full h-[400px] border border-red-600`} />
    )
}


export default RadarDiagramForRank