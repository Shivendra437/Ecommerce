import React, { useEffect, useState } from "react";
import {Text,View,StyleSheet, SafeAreaView, Image, TextInput, FlatList, ImageBackground, ScrollView} from 'react-native';
import { colors } from "../../theme/colors";
import { horizontalScale, moderateScale, verticalScale } from "../../utilities/Reponsive";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch,useSelector } from "react-redux";
import { customProduct } from "../../redux/slices/ProductSlice"
import CustomButton from "../../component/CustomButton";
import Entypo from 'react-native-vector-icons/Entypo'
import { StarRatingDisplay } from 'react-native-star-rating-widget';


export default function HomePage(){
    const dispatch=useDispatch();
    const category=useSelector((state)=>state.product?.productType);

    const dayDealItem=[
{
  name:"Women Printed Kurta",
  img:require('../../assets/images/dress.png'),
  description:'Neque porro quisquam est qui dolorem ipsum quia',
  rating:4,
  Price:2499,
  discount:"40% ",
  sellingPrice:1500
},
{
  name:"Women Printed Kurta",
  img:require('../../assets/images/shoes.png'),
  description:'Neque porro quisquam est qui dolorem ipsum quia',
  rating:4,
  Price:4999,
  discount:"50% ",
  sellingPrice:2499
},
    ]
    const productList=[
      {
        name:`IWC Schaffhausen 2021 Pilot's Watch "SIHH 2019" 44mm`,
        img:require('../../assets/images/watch.png'),
        Price:2499,
        discount:"40% ",
        sellingPrice:1500
      },
      {
        name:`Labbin White Sneakers For Men and Female`,
        img:require('../../assets/images/whiteShoes.png'),
        Price:4999,
        discount:"50% ",
        sellingPrice:2499
      },
      {
        name:`Labbin White Sneakers For Men and Female`,
        img:require('../../assets/images/whiteShoes.png'),
        Price:4999,
        discount:"50% ",
        sellingPrice:2499
      }]
    const imageMap= {
        'p1.png': require('../../assets/images/p1.png'),
        'p2.png': require('../../assets/images/p2.png'),
        'p3.png': require('../../assets/images/p3.png'),
        'p4.png': require('../../assets/images/p4.png'),
        'p5.png': require('../../assets/images/p5.png'),
      };
      
useEffect(()=>{
 dispatch(customProduct())
},[])


const DealofDay = ({ item }:any) => {
  return (
    <View style={[styles.dealDayView]}>
      <Image source={item.img} style={styles.img} resizeMode="cover"/>
      <View   style={{padding:5}} > 
      <Text style={styles.nmeText}>{item.name}</Text>
      <Text style={styles.discText}>{item.description}</Text> 
      <Text style={styles.sellPrice}>₹{item.sellingPrice}</Text>
      <View style={{flexDirection:'row',gap:10,alignItems:"center"}}>
        <Text>{item.Price}</Text>
        <Text style={styles.discountTxt}>{item.discount}</Text>
      </View>
      <StarRatingDisplay
      starSize={10}
        rating={item.rating}
      />
      </View>
    </View>
  );
};



const Product = ({ item }:any) => {
  return (
    <View style={styles.productView}>
      <Image source={item.img} style={styles.Productimg} resizeMode="cover"/>
      <View   style={{padding:5}} > 
         <Text style={styles.nmeText}>{item.name}</Text>
      <Text style={styles.sellPrice}>₹{item.sellingPrice}</Text>
      <View style={{flexDirection:'row',gap:10,alignItems:"center"}}>
        <Text>{item.Price}</Text>
        <Text style={styles.discountTxt}>{item.discount}</Text>
      </View>
      </View>
    </View>
  );
};

    return(
        <View style={styles.container}>
    <View style={styles.headerView}>
<Image source={require('../../assets/images/sidebar.png')} style={styles.sidebar}/>
<Image source={require('../../assets/images/headerimg.png')} style={styles.headerimg}/>
<Image source={require('../../assets/images/avater.png')} style={styles.avater}/>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} >  
    <View style={styles.inputContainer}>
      <Icon name="search" size={20} color="#aaa" style={styles.iconLeft} />
      <TextInput
        placeholder="Search any Product.."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <Icon name="mic" size={20} color="#aaa" style={styles.iconRight} />
    </View >
    <View style={styles.filterView}>
        <Text style={styles.featureText}>
        All Featured
        </Text>
<View style={styles.filterfnView}>
<Text>Sort</Text>
<Text>Filter</Text>
</View>
    </View>
    <View>
     <FlatList
      showsHorizontalScrollIndicator={false}
     style={{marginTop:verticalScale(10),backgroundColor:colors.white}}
      data={category}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ margin: 10 }}>
           <Image
           source={imageMap[item.img]}
            style={styles.image}
          />
          <Text style={styles.categoryName}>{item.img}</Text>
        </View>
      )}
    /> 
     </View>
     <View style={styles.bannerView}>
        <ImageBackground  style={{height:200,
    justifyContent:"center"}}  source={require('../../assets/images/ad.png')}>
   <View style={styles.disntView}>
<Text style={styles.offText}>50-40% OFF</Text>
<Text style={styles.adText}>Now in (product)</Text>
<Text style={styles.adText}>All colours</Text>
<CustomButton
                title="Shop Now"
                onPress={()=>{}}
                textColor="#FFF"
                disabled={false}
                Styling={styles.btn}
            />
   </View>
     </ImageBackground>
     </View>
<View style={styles.timerView}> 
  <View style={{gap:5,justifyContent:"center"}}>
    <Text style={styles.dealText}>Deal of the Day</Text>
    <View style={{flexDirection:'row',gap:5}}>
    <Entypo name="stopwatch" size={20} color={colors.white}/>    
    <Text style={styles.dealText}>22h 55m 20s remaining </Text>
    </View>
  </View>
  <CustomButton
                title="View All"
                onPress={()=>{}}
                textColor="#FFF"
                disabled={false}
                Styling={styles.timerBtn}
            />
</View>
<FlatList
     style={{marginTop:verticalScale(10),backgroundColor:colors.white}}
      data={dayDealItem}
      keyExtractor={(item, index) => index?.toString()} 
      numColumns={2}
      renderItem={({ item }) => <DealofDay item={item} />}
    /> 
    <View style={styles.offerView}>
<Image source={require('../../assets/images/offer.png')} style={styles.offerImg}/>
<View style={{marginRight:horizontalScale(30)}}>
  <Text style={styles.offerText}>Special Offers</Text>
 <Text style={styles.offerdescitpionText}>We make sure you get the </Text> 
 <Text style={styles.offerdescitpionText} >offer you need at best prices</Text>
</View>
    </View>
    <View style={[styles.timerView,{backgroundColor:colors.pink}]}> 
  <View style={{gap:5,justifyContent:"center"}}>
    <Text style={styles.dealText}>Trending Products</Text>
    <View style={{flexDirection:'row',gap:5}}>
    <Entypo name="calendar" size={20} color={colors.white}/>    
    <Text style={styles.dealText}>Last Date 29/02/22</Text>
    </View>
  </View>
  <CustomButton
                title="View All"
                onPress={()=>{}}
                textColor="#FFF"
                disabled={false}
                Styling={styles.timerBtn}
            />
</View>
<FlatList
horizontal
showsHorizontalScrollIndicator={false}
     style={{marginTop:verticalScale(10),backgroundColor:colors.white}}
      data={productList}
      keyExtractor={(item, index) => index?.toString()} 
      renderItem={({ item }) => <Product item={item} />}
    /> 
    <View style={styles.saleView}>
<Image source={require('../../assets/images/holiBanner.png')} style={styles.offerbannerimg} resizeMode="cover"/>
  
  <View style={styles.bannerContentView}> 
    <View style={{gap:5}}> 
    <Text style={[styles.dealText,{color:colors.black}]}>New Arrivals</Text>
    <Text style={{fontSize:moderateScale(16)}}>Summer’ 25 Collections</Text>
    </View>
    <CustomButton
                title="View All"
                onPress={()=>{}}
                textColor="#FFF"
                backgroundColor={colors.pink}
                disabled={false}
                Styling={styles.timerBtn}
            />
  </View>
    </View>
    <View style={styles.discountProductView}> 
      <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>Sponserd</Text>
  <Image source={require('../../assets/images/banner50.png')} style={styles.offerbannerimg} resizeMode="cover"/>
  <View style={styles.discountTextView}>
<Text style={styles.discountText}>up to 50% Off</Text>
<Icon name="chevron-right" size={20} color={colors.black} style={styles.iconLeft} />
  </View>
  
  </View>

</ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
       padding:moderateScale(16),
    },
    headerView:{
         flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    sidebar:{
    height:verticalScale(32),
    width:horizontalScale(32)
},
avater:{
    height:verticalScale(40),
    width:horizontalScale(40)
},
headerimg:{
    height:verticalScale(32),
    width:horizontalScale(111)
},
inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:verticalScale(16),
    borderRadius: moderateScale(25),
    paddingHorizontal: horizontalScale(15),
    height:verticalScale(48),
    backgroundColor:colors.white,
  },
  iconLeft: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconRight: {
    marginLeft: 10,
  },
  filterView:{
    marginTop:verticalScale(16),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  featureText:{
    fontSize:moderateScale(18),
    fontWeight:'600'
  },
  filterfnView:{
    flexDirection:'row',
    justifyContent:"space-between",
    gap:20
  },
  image: {
    width:horizontalScale(56),
    height: verticalScale(56),
    borderRadius: 10,
  },
  categoryName:{
    marginTop:verticalScale(5),
    fontSize:moderateScale(14),
    alignSelf:"center"
  },
  bannerView:{marginTop:verticalScale(10),
  
  },
  disntView:{
    paddingHorizontal:horizontalScale(15),
    gap:5

  },
  offText:{
    fontSize:moderateScale(20),
    color:colors.white,
    fontWeight:"bold"

  },
  adText:{
    fontSize:moderateScale(14),
    color:colors.white,
  },
  btn: {
    marginTop:verticalScale(5),
    width:'50%',
    height: verticalScale(40),
    borderWidth:1,
    borderColor:colors.white
},
timerView:{
  marginTop:verticalScale(10),
  height:verticalScale(60),
  flexDirection:"row",
  justifyContent:"space-around",
  backgroundColor:colors.blue,
  borderRadius:moderateScale(10),
  paddingHorizontal:horizontalScale(10)
},
dealText:{
  fontSize:moderateScale(16),
  fontWeight:"500",
  color:colors.white
},
timerBtn:{
  height: verticalScale(30),
  borderWidth:1,
  borderColor:colors.white,
  alignSelf:"center"
},
dealDayView:{
  flex:1,
  flexDirection:"row",
  flexWrap:"wrap",
height:verticalScale(250),
width:'48%',
marginRight:5,
borderRadius:10
},
img:{
  height:verticalScale(150),
  width:"100%"
},
nmeText:{
  fontSize:moderateScale(14),
  fontWeight:"600",
  color:colors.black
},
discText:{
  fontSize:moderateScale(12),
  color:colors.black
},
sellPrice:{
  fontSize:moderateScale(13),
  fontWeight:'600'
},
discountTxt:{
  fontSize:moderateScale(11),
  color:colors.lightPink,
  alignSelf:'center'
},
offerView:{
  marginTop:verticalScale(10),
  backgroundColor:colors.white,
  padding:10,
  height:verticalScale(80),
  borderRadius:10,
  gap:5,
  flexDirection:'row',
justifyContent:"space-between"
},
offerImg:{
  height:verticalScale(60),
  width:horizontalScale(75)
},
offerText:{
  fontSize:moderateScale(16),
  fontWeight:'600'
},
offerdescitpionText:{
   fontSize:moderateScale(12),
},
Productimg:{
width:'100%',
height:verticalScale(100),
borderRadius:10
},
productView:
  {paddingBottom:10,height:verticalScale(190),width:horizontalScale(142),
    marginRight:20
  },
  saleView:{
    marginTop:verticalScale(12),
    height:verticalScale(270),
    borderRadius:20,
    width:'100%',
  },
  offerbannerimg:{
    height:verticalScale(220),
  width:'auto',
  borderRadius:12,
  marginTop:verticalScale(10)
  
  },

    bannerContentView:{padding:10,
      flexDirection:"row",justifyContent:"space-between",
      alignItems:'center'},
      discountProductView:{
        marginTop:verticalScale(15),
        padding:moderateScale(12),
        height:'auto',

      },
      discountTextView:{
        marginTop:verticalScale(12),
        flexDirection:'row',
        justifyContent:"space-between",

      },
      discountText:{
        fontSize:moderateScale(16),
        fontWeight:'600'
      }
      
})