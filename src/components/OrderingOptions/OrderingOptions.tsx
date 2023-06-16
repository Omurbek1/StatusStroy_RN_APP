import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import DeliveryMethod from '../../components/DeliveryMethod/DeliveryMethod';
import PointOfIssue from '../../components/PointOfIssue/PointOfIssue';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';

export interface OrderingDetailsProps {
  values: any;
  handleChange: any;
  handleBlur: any;
}
const OrderingOptions: FC<OrderingDetailsProps> = ({
  values,
  handleChange,
  handleBlur,
}) => {
  return (
    <View style={styles.radioContainer}>
      <DeliveryMethod
        activeBtn={values.deliveryMethod}
        handleChange={handleChange('deliveryMethod')}
      />
      {values.deliveryMethod === 'Самовывоз' && <PointOfIssue />}
      {values.deliveryMethod === 'Транспортная компания' && (
        <OrderDetails
          apartmentValue={values.deliveryApartment}
          floorValue={values.deliveryFloor}
          dateValue={values.deliveryDate}
          porchValue={values.deliveryPorch}
          deliveryAddress={values.deliveryAddress}
          handleChangeApartmentValue={handleChange('deliveryApartment')}
          handleChangeDateValue={handleChange('deliveryDate')}
          handleChangeFloorValue={handleChange('deliveryFloor')}
          handleChangePorchValue={handleChange('deliveryPorch')}
          handleChangeDeliveryAddressValue={handleChange('deliveryAddress')}
          handleBlurApartmentValue={handleBlur('deliveryApartment')}
          handleBlurDateValue={handleBlur('deliveryDate')}
          handleBlurFloorValue={handleBlur('deliveryFloor')}
          handleBlurPorchValue={handleBlur('deliveryPorch')}
          handleBlurDeliveryAddressValue={handleBlur('deliveryAddress')}
        />
      )}
      <PaymentMethod
        value={values.payMethod}
        handleChange={handleChange('payMethod')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryBlock: {
    marginBottom: 30,
  },
  radioContainer: {},
  headerTextRadio: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  radioBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 46,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default OrderingOptions;
