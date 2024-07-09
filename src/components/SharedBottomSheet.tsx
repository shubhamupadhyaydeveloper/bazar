import { View, Text } from 'react-native'
import React, { Children } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet';
import SharedButton from './SharedButton';

type Props = {
  refRBSheet : React.MutableRefObject<any | undefined>
  children : React.ReactNode
}

const SharedBottomSheet = ({refRBSheet,children}:Props) => {
  return (
    <RBSheet
     closeOnPressBack={true}
     draggable={true}
      ref={refRBSheet}
      height={150}
      useNativeDriver={false}
      customStyles={{
        draggableIcon: {
          backgroundColor: '#ccc',
        },

        container : {
          borderTopLeftRadius : 12,
          borderTopRightRadius : 12
        }
      
      }}
      customModalProps={{
        animationType: 'slide',
       
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
    >
     {children}
    </RBSheet>
  )
}

export default SharedBottomSheet;