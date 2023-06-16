import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: '#ffff',
        flex: 1,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
        marginBottom: 30,
        marginTop: 30,
    },
    listContainer: {
        marginTop: 5,
        backgroundColor: '#fff',
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },
    countercontainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 150,
        top: -20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 10,
        color: '#000',
    },
    images: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        width: 100,
        height: 100,

        borderRadius: 7,
    },
    favoriteIcon: {
        marginLeft: 110,
        marginTop: -10,
        top: -17,
        zIndex: 99,
        position: 'absolute',
    },
    decrement: {
        width: 25,
        height: 23,
        borderRadius: 3,
        backgroundColor: '#f2f2f2',
    },
    increment: {
        width: 25,
        height: 23,
        borderRadius: 3,
        backgroundColor: '#F1BD40',
        color: '#fff',
    },
    counter: {
        marginLeft: 4,
        marginRight: 8,
    },
    icon: {
        marginLeft: 3,
        marginTop: 3,
    },
    icon1: {
        marginLeft: 3,
        color: '#fff',
        marginTop: 3,
    },
    discount: {
        backgroundColor: 'red',
        width: 40,
        height: 20,
        borderRadius: 5,
        color: 'white',
    },
    price: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
    },
    subprice: {
        fontSize: 12,
        color: '#B3B3B3',
        fontWeight: '400',
    },
    imageContainer: {
        height: 94,
        margin: 2,
        top: 1.5,
        width: 96,
        backgroundColor: 'rgba(255,255,255,255)',
        borderRadius: 10,
    },
    image: {
        width: 60,
        height: 55,
        borderRadius: 7,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 18,
    },
    deleteAll: {
        marginLeft: 190,
        backgroundColor: '#F3F3F3',
        borderRadius: 5,
        padding: 5,
    },
    textcontainer: {
        marginLeft: 15,
        marginTop: 0,
    },
    textcontainertext: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        width: 220,
    },
    textPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 30,
    },
    code: {
        color: '#808080',
    },
    favorite: {
        top: 5,
        left: 73,
        position: 'absolute',
        zIndex: 999,
    },
    deletebutton: {
        marginLeft: 195,
        backgroundColor: 'red',
        width: 35,
        height: 90,
        borderRadius: 5,
        alignContent: 'center',
        alignSelf: 'center',
    },
    deleteicon: {
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
    containers: {
        flex: 1,
        marginBottom: 820,
    },
    basketFooter: {
        top: 10,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
    },
    total: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    totals: {
        marginLeft: 90,
    },
    discounts: {
        marginLeft: 90,
        marginTop: 5,
        color: 'red',
    },
    productSum: {
        marginLeft: 90,
        marginTop: 5,
        color: '#808080',
    },
    quantityproducts: {
        fontSize: 16,
        color: '#000',
    },
    totalSum: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 90,
    },
    noproductsContainer: {
        alignItems: 'center',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 200,
    },
    noproductsContainerText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 450,
    },

    modalText: {
        fontSize: 14,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        borderBottomColor: '#F5F5F5',
        color: '#000',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    modalButtonDelete: {
        color: 'red',
        fontSize: 18,
        borderRadius: 5,
        marginVertical: 5,
    },
    modalButtonCancel: {
        paddingLeft: 55,
        paddingRight: 55,
        height: 60,
        top: -23,
        marginTop: 30,
        color: '#3362AB',
        fontSize: 18,
    },
    modalContent2: {
        backgroundColor: 'white',
        paddingLeft: 28,
        paddingRight: 28,
        marginTop: 20,
        borderRadius: 14,
        alignItems: 'center',
        height: 50,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 150,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 0,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 80,
        width: 115,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 95,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        marginLeft: 0,
        width: 40,
        borderRadius: 5,
        right: 0,
    },
    backArrow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        width: 45,
        backgroundColor: '#F5F5F5',

        paddingHorizontal: 13,
        marginTop: 10,
        borderBottomColor: '#E0E0E0',
        borderRadius: 10,
    },
});
