import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { loadToys } from '../store/actions/toy.action';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ToyDashboard() {
    const toys= useSelector((storeState)=> storeState.toyModule.toys)

    useEffect(()=>{
        loadToys()
    },[])

    const data = {
        labels: toyService.getLabelList(),
        datasets: [
            {
                label: '# of Votes',
                data: toyService.countLabelsMap(toys),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(62, 222, 64, 0.2)',
                    'rgba(88, 19, 64, 0.2)',
                    'rgba(12, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(62, 222, 64, 1)',
                    'rgba(88, 19, 64, 1)',
                    'rgba(12, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    console.log(data)


    return <section>
        <h2>Toy Dashboard</h2>
        <Doughnut data={data} />
    </section>
}