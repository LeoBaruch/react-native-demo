/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
  Clipboard,
  Alert,
} from 'react-native';
import Navigator from './components/Navigator';
import { pxToDp } from './utils';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'Java',
      togglePicker: false,
      inputValue: '',
      content: ''
    };
    this.addressString = '83rh9djjd90kmwdh0o2dwm09wd9u38rfjd823f9h8efjwoifh98e2fxxxxxj';
  }
  componentDidMount() {
    console.log('It is all right!')
    // debugger
  }

  handleCurrencyChange = (currency,index) => {
    this.setState({
      currency: currency
    })
  }

   setClipboardContent = async () => {
    Clipboard.setString(this.addressString);
    try {
      var content = await Clipboard.getString();
      Alert.alert(content);
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  handleInputChange = (value) => {
    const numArr = value.split('.');
    if(numArr.length >= 2 && numArr[1].length > 8) {
      const first = numArr[0];
      const second = numArr[1];
      const validSecond = second.slice(0,8);
      const formatValue = first + '.' + validSecond;
      setTimeout(() => {
        this.setState({
          inputValue: formatValue
        })
      }, 0);
 
    }
    this.setState({
      inputValue: value,
    })
  }

  render() {
    const { currency, togglePicker, inputValue } = this.state;
    const loanAmount = parseInt(inputValue * 101);
    return (
      <View style={styles.container}>
        <Navigator centerPartText='Add conllateral'/>
        <View style={[styles.topPart, styles.marginTop]}>
          <Text>Collateral asset</Text>
          <TouchableOpacity onPress={() => { this.setState({togglePicker: !togglePicker}) }}>
            <View style={styles.pickerWrapper}>
              <Text >{currency}</Text>
              <Image source={require('./images/right_arrow_grey.png')} style={styles.arrowIcon}/>
            </View>
            </TouchableOpacity>
        </View>
        <View style={styles.topPart}>
          <Text>Amount</Text>
          <TextInput 
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={this.handleInputChange}
            value={inputValue}
            placeholder="Enter a number"
          />
        </View>
        <View style={styles.mainPart}>
          <Text style={styles.loanRulesFont}>Loan limit can be increased by { loanAmount } DAI/USDT</Text>
          <View style={styles.loanRules}>
            <Text style={styles.loanRulesFont}>The platform loan restrictions are:</Text>
            <Text style={styles.loanRulesFont}>A minimum of 500 DAI/USDT for a single loan</Text>
            <Text style={styles.loanRulesFont}>Total loaned amount does not exceed 10,000 DAI/USDT</Text>
            <Text style={styles.loanRulesFont}>Please manage assets appropriately</Text>
          </View>
          <View style={styles.addressWrapper}>
            <Text style={styles.addressFont}>Collateral wallet address：</Text>
            <Text style={[styles.addressFont, styles.MarginTop26]}>{this.addressString}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={this.setClipboardContent}
        >
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Copy address</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.footerPart}>
          <Text style={styles.footerFont}>It takes time for the collateral to arrive.</Text>
          <Text style={styles.footerFont}>When it has been received, you will be notified via email</Text>
        </View>
        {/*<Text>Hello world!</Text>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>*/}
        {
          togglePicker &&
          <Picker
            selectedValue={currency}
            onValueChange={this.handleCurrencyChange}
            style={styles.Picker}
          >
            <Picker.Item  label="BTC" value="BTC"/>
            <Picker.Item  label="ETH" value="ETH"/>
            <Picker.Item  label="HT" value="HT"/>
            <Picker.Item  label="LBA" value="LBA"/>
            <Picker.Item  label="BNB" value="BNB"/>
          </Picker>
        }  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(248,248,248,1)',
    fontSize: pxToDp(32),
  },
  textInput: {
    height: pxToDp(108),
    flex: 1,
    textAlign: 'right',
  },
  topPart: {
    height: pxToDp(108),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pxToDp(36),
    backgroundColor: '#FFF'
  },
  marginTop: {
    marginTop: pxToDp(26),
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  Picker: {
    backgroundColor: 'rgba(248,248,248,1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: pxToDp(300),
    borderTopWidth: pxToDp(1),
    borderBottomWidth: pxToDp(1),
  },
  arrowIcon: {
    width: pxToDp(16),
    height: pxToDp(26),
    marginLeft: pxToDp(10)
  },
  mainPart: {
    paddingTop: pxToDp(14),
    paddingHorizontal: pxToDp(40),
  },
  loanRules: {
    marginTop: pxToDp(20),
  },
  loanRulesFont: {
    fontSize: pxToDp(24),
    color: '#9B9B9B'
  },
  addressWrapper: {
    marginTop: pxToDp(66),
  },
  addressFont: {
    fontSize: pxToDp(28),
    color: '#4A4A4A'
  },
  MarginTop26: {
    marginTop: pxToDp(26)
  },
  button: {
    marginTop: pxToDp(108),
    width: pxToDp(560),
    height: pxToDp(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CA6C6',
    borderRadius: pxToDp(8)
  },
  buttonText: {
    color: '#FFF'
  },
  footerPart: {
    marginTop: pxToDp(44),
    alignItems: 'center'
  },
  footerFont: {
    lineHeight: pxToDp(34),
    fontSize: pxToDp(24),
    color: '#9B9B9B'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
