//TODO Think even more about optimization because, due to ECharts, the bundle exceeds 500KB, but that will be for later.
import * as echarts from "echarts/core"
import { RadarChart } from "echarts/charts"
import { TooltipComponent, TitleComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import { useEffect} from "react"
import { Rating } from "../../types/Rating"

echarts.use([RadarChart, TooltipComponent, TitleComponent, LegendComponent, CanvasRenderer]);


type EChartsOption = echarts.EChartsCoreOption


interface RadarDiagramProps {
    idHTMLElement: string,
    title: string,
    rangs: Rating[] | Partial<Rating>[],
}


const RadarDiagramForRank: React.FC<RadarDiagramProps> = ({ rangs, idHTMLElement, title }) => {

    const actorGameRate: number = rangs.reduce((acc, currVal) => acc + currVal.rate_actor_game!, 0)/ rangs.length
    const writingRate: number = rangs.reduce((acc, currVal) => acc + currVal.rate_writing!, 0)/ rangs.length
    const cinematographyRate: number = rangs.reduce((acc, currVal) => acc + currVal.rate_cinematography!, 0)/ rangs.length
    const soundRate: number = rangs.reduce((acc, currVal) => acc + currVal.rate_sound!, 0)/ rangs.length


    useEffect(() => {
        const myChart = echarts.init(document.getElementById(idHTMLElement))
        let option: EChartsOption

        option = {
            title: {
                show: false

            },
            legend: {
                data: [title]
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: "Actor's Performance", max: 10 },
                    { name: 'Scenario Quality', max: 10 },
                    { name: 'Cinematic Quality', max: 10 },
                    { name: 'Sound Quality', max: 10 }
                ],
                // TODO The axis names are hidden when the screen becomes very small, and I currently can't find a solution to this problem.
                axisName: {
                    show: true,
                }
                
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                            value: [actorGameRate, writingRate, cinematographyRate, soundRate],
                            name: title
                        }
                    ]
                }
            ]
            
        }


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
    }, [rangs])


    return (
        <div id={idHTMLElement} className={`w-full h-[400px] border border-black`} />
    )
}


export default RadarDiagramForRank