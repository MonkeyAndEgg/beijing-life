import { MdPhoneIphone, MdOutlineSmartToy } from 'react-icons/md';
import { GiCigarette, GiBeerBottle } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';
import { BiBookHeart } from 'react-icons/bi';
import { ImVideoCamera } from 'react-icons/im';
import { RiMarkupLine } from 'react-icons/ri';
import { useEffect } from 'react';
import { randomInteger, randomNumber } from '../helper/util';
import arrayShuffle from 'array-shuffle';
import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from '../constants/stock';
import { StockMultiplierMap } from '../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { setMarketItems } from '../../redux/actions/market';
import { RootState } from '../../redux/reducers/rootReducer';

const STOCK = [
  { id:'1', icon: GiCigarette, name: CIGARETTE, price: 200 },
  { id:'2', icon: BiBookHeart, name: PORN, price: 1500 },
  { id:'3', icon: ImVideoCamera, name: CD, price: 50 },
  { id:'4', icon: GiBeerBottle, name: ALCOHOL, price: 400 },
  { id:'5', icon: RiMarkupLine, name: COSMETIC, price: 800 },
  { id:'6', icon: AiOutlineCar, name: CAR, price: 50000 },
  { id:'7', icon: MdPhoneIphone, name: PHONES, price: 1200 },
  { id:'8', icon: MdOutlineSmartToy, name: TOY, price: 500 },
];

const useStockItems = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const newStock = arrayShuffle(STOCK);
    const updatedStock = [];
    const numOfStocksToUpdate = randomInteger(4,6);
    for (let i = 0; i < numOfStocksToUpdate; i++) {
      const poppedItem = newStock.pop();
      const stockItemOnMap = StockMultiplierMap.get(poppedItem.name);
      const min = stockItemOnMap.min;
      const max = stockItemOnMap.max;
      const updatedItem = { ...poppedItem, price: Math.floor(poppedItem.price * randomNumber(min, max)) };
      if (state.events.businessEvent && state.events.businessEvent.type === updatedItem.name) {
        updatedItem.price = state.events.businessEvent.isPriceUp ?
          Math.floor(updatedItem.price * stockItemOnMap.mad) : Math.floor(updatedItem.price * 0.1);
      }
      updatedStock.push(updatedItem);
    }
    dispatch(setMarketItems(updatedStock));
  }, [state.events.businessEvent, dispatch]);

  return state.market.items;
};

export default useStockItems;