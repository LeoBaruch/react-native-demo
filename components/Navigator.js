import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { pxToDp } from '../utils/index';

export default class Navigator extends Component {
    render() {
        const { centerPartText, rightPartText } = this.props;
        return (
                <View style={styles.container}>
                    <View style={styles.left}>
                        <Image style={styles.backIcon} source={require('../images/back_icon.png')}></Image>
                        <Text style={styles.leftWord}>Back</Text>
                    </View>
                    <Text style={styles.center}>{centerPartText}</Text>
                    <Text style={styles.right}>{rightPartText}</Text>
                </View>
        )
    }
}

Navigator.defaultProps = {
    rightPartText: ''
};

const styles = StyleSheet.create({
    container: {
        width: pxToDp(750),
        height: pxToDp(128),
        paddingTop: pxToDp(64),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    left: {
       paddingLeft: pxToDp(18), 
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
    },
    backIcon: {
        width: pxToDp(24),
        height: pxToDp(42),
        marginRight: pxToDp(10),
    },
    leftWord: {
        fontSize: pxToDp(34),
        height: pxToDp(48),
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        height: pxToDp(48),
        justifyContent: 'center',
        fontSize: pxToDp(34),
        color: '#030303',
    },
    right: {
        flex: 1,
    }
  
  });