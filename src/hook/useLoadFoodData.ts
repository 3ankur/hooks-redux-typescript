import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../redux/actions/constant";
import { LoadFoodData } from "../utills";


function useLoadFoodData() {
    const [apiStatus, setAPIStatus] = useState('idle');
    const dispath = useDispatch()

    useEffect(() => {
        setAPIStatus('loading');
        LoadFoodData().then((result) => {
            setAPIStatus('success');
            dispath({
                type: ACTIONS.LOAD_MENU,
                payload: {
                    menu: result
                }
            })
        }).catch((error) => {
            setAPIStatus('error');
        })

    }, [dispath])
    return apiStatus;
}

export default useLoadFoodData;
