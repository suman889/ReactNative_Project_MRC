import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import CatagoryCard from '../../Component/Global/CatagoryCard'



//Development Packege
import HomeService from '../../Service/HomeService';

const HomeCareCatagory = (props) => {

    const [imgUrl, setImgUrl] = useState('')
    const [name, setName] = useState('')
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCatagory()
        console.log('ide--->', props.route.params.servicesId);
    }, [])




    const fetchCatagory = async () => {
        console.log('call');
        let result = await HomeService.getCatagory();
        console.log(result);
        if (result && result.status) {
            console.log('result00000', result)
            setImgUrl(result.img_path)
            setData(result.data)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header
                name={props.route.params.Tittle? props.route.params.Tittle: 'Home Care Catagory'  }
            />

            <CatagoryCard
                servicesId={ props.route.params.servicesId}
                passData={data}
                url={imgUrl}
                Tittle={props.route.params.Tittle?props.route.params.Tittle:null}
            />
            <View style={{
                height:20
            }} />
        </View>
    )
}

export default HomeCareCatagory

const styles = StyleSheet.create({})