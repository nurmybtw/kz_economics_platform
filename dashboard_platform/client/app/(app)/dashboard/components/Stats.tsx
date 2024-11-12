'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import {
    Center,
    Loader,
    Stack,
    Title,
    NativeSelect,
    Group,
    SegmentedControl,
    Text,
} from '@mantine/core'
import Map from './Map'

import {
    get5YearPrediction,
    getHistoricalData,
} from '@/app/api/realestate_investments.api'
import Chart from './Chart'
import { getCountryRating, getRegionRating } from '@/app/api/rating'

const Stats = () => {
    const [selectedCounty, setSelectedCounty]: any = useState({
        id: 13,
        name: 'Astana',
        type: 'City',
        ru_name: 'г. Астана',
    })
    const [scope, setScope]: any = useState('data')

    // For Data
    const [analysisType, setAnalysisType]: any = useState('historical')

    // For rating
    const [ratingScope, setRatingScope]: any = useState('rating_country')

    const [data, setData]: any = useState(null)
    const [dataLoading, setDataLoading]: any = useState(false)

    useEffect(() => {
        const loadHistoricalData = async (region: any) => {
            setDataLoading(true)
            const temp = await getHistoricalData({ region })
            setData(temp)
            setDataLoading(false)
        }
        const load5YearPrediction = async (region: any) => {
            setDataLoading(true)
            const temp = await get5YearPrediction({ region })
            setData(temp)
            setDataLoading(false)
        }
        const loadCountryRating = async () => {
            setDataLoading(true)
            const temp = await getCountryRating()
            setData(temp)
            setDataLoading(false)
        }
        const loadRegionRating = async (region: any) => {
            setDataLoading(true)
            const temp = await getRegionRating(region)
            setData(temp)
            setDataLoading(false)
        }
        if (selectedCounty) {
            if (scope === 'rating') {
                if (ratingScope === 'rating_country') {
                    loadCountryRating()
                } else if (ratingScope === 'rating_region') {
                    loadRegionRating(selectedCounty.ru_name)
                }
            } else if (scope === 'data') {
                if (analysisType == 'historical') {
                    loadHistoricalData(selectedCounty.ru_name)
                } else if (analysisType == 'forecast') {
                    load5YearPrediction(selectedCounty.ru_name)
                }
            }
        }
    }, [selectedCounty, analysisType, scope, ratingScope])

    const spatialData = {
        region_id: 13,
        cracks_count: 1,
        agriculture: 0,
        road: 1146.3000000000002,
        methane: 0,
        old_road: 0,
        damage: 786.3000000000001,
        water: 0,
    }

    return (
        <div className='h-full'>
            <div className='flex h-full gap-5'>
                <div className='basis-0 grow-[11] border rounded-lg bg-white w-full'>
                    <div className='flex flex-col'>
                        <div className='border-b p-4'>
                            <Group gap={15}>
                                <div>
                                    <SegmentedControl
                                        withItemsBorders={false}
                                        value={scope}
                                        onChange={setScope}
                                        data={[
                                            {
                                                value: 'data',
                                                label: 'Данные',
                                            },
                                            {
                                                value: 'rating',
                                                label: 'Рейтинг отраслей',
                                            },
                                            {
                                                value: 'condition',
                                                label: 'Состояние инфраструктуры',
                                            },
                                        ]}
                                    />
                                </div>
                            </Group>
                        </div>
                        {scope === 'data' ? (
                            <div className=''>
                                <div className='border-b p-4'>
                                    <Group>
                                        <NativeSelect
                                            label='Выберите данные для вывода'
                                            data={[
                                                'Инвестиции в жилищное строительство',
                                            ]}
                                        />
                                        <div>
                                            <Text size='sm' fw={500} mb={1}>
                                                Тип анализа
                                            </Text>
                                            <SegmentedControl
                                                withItemsBorders={false}
                                                value={analysisType}
                                                onChange={setAnalysisType}
                                                data={[
                                                    {
                                                        value: 'historical',
                                                        label: 'История',
                                                    },
                                                    {
                                                        value: 'forecast',
                                                        label: 'Прогноз на 5 лет',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </Group>
                                </div>
                                <div className='p-8 min-w-full'>
                                    {dataLoading ? (
                                        <Loader />
                                    ) : (
                                        <div className=''>
                                            {data ? (
                                                <div className='min-h-[400px]'>
                                                    <Chart data={data} />
                                                </div>
                                            ) : (
                                                <Center>
                                                    <div className=''>
                                                        No data to display
                                                    </div>
                                                </Center>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : scope == 'rating' ? (
                            <div className=''>
                                <div className='border-b p-4'>
                                    <Group>
                                        <div>
                                            <Text size='sm' fw={500} mb={1}>
                                                Масштаб данных
                                            </Text>
                                            <SegmentedControl
                                                withItemsBorders={false}
                                                value={ratingScope}
                                                onChange={setRatingScope}
                                                data={[
                                                    {
                                                        value: 'rating_country',
                                                        label: 'Рейтинг по стране',
                                                    },
                                                    {
                                                        value: 'rating_region',
                                                        label: 'Рейтинг по регионам',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </Group>
                                </div>
                                <div className='p-8 min-w-full'>
                                    {dataLoading ? (
                                        <Loader />
                                    ) : (
                                        <div className='min-h-[400px]'>
                                            {data && data.image ? (
                                                <div className='max-h-[400px]'>
                                                    <Image
                                                        src={`data:image/png;base64,${data.image}`}
                                                        width={800}
                                                        height={200}
                                                        alt='Rating Heatmp'
                                                    />
                                                </div>
                                            ) : (
                                                <Center>
                                                    <div className=''>
                                                        Select region please
                                                    </div>
                                                </Center>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className='p-8'>
                                {spatialData.region_id === selectedCounty.id ? (
                                    <div className=''>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Number of road cracks detected:{' '}
                                            </span>
                                            {spatialData.cracks_count}
                                        </Text>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Normal roads area:{' '}
                                            </span>
                                            {spatialData.road} m<sup>2</sup>
                                        </Text>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Old roads area:{' '}
                                            </span>
                                            {spatialData.old_road} m<sup>2</sup>
                                        </Text>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Damaged areas:{' '}
                                            </span>
                                            {spatialData.damage} m<sup>2</sup>
                                        </Text>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Water areas:
                                            </span>
                                            {spatialData.water} m<sup>2</sup>
                                        </Text>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Methane area:{' '}
                                            </span>
                                            {spatialData.methane} m<sup>2</sup>
                                        </Text>
                                        <Text mb={4}>
                                            <span className='font-semibold'>
                                                Unusued areas for agriculture:{' '}
                                            </span>
                                            {spatialData.agriculture} m
                                            <sup>2</sup>
                                        </Text>
                                    </div>
                                ) : (
                                    <div className=''>
                                        There are no available data yet for this
                                        region.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className='basis-0 grow-[9] border rounded-lg bg-white overflow-auto'>
                    <div className='flex flex-col'>
                        <div className='max-h-[500px]'>
                            <Map
                                selectedCounty={selectedCounty}
                                setSelectedCounty={setSelectedCounty}
                            />
                        </div>
                        <div className='border-t p-4'>
                            <div className='font-semibold text-xl'>
                                {selectedCounty ? selectedCounty.name : ''}{' '}
                                {selectedCounty?.type &&
                                selectedCounty.type === 'City'
                                    ? 'City'
                                    : 'Region'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
