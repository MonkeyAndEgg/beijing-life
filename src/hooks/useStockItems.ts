import { MdPhoneIphone, MdOutlineSmartToy } from 'react-icons/md';
import { GiCigarette, GiBeerBottle } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';
import { BiBookHeart } from 'react-icons/bi';
import { ImVideoCamera } from 'react-icons/im';
import { RiMarkupLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { randomInteger, randomNumber } from '../helper/util';
import arrayShuffle from 'array-shuffle';
import { ALCOHOL, CAR, CD, CIGARETTE, COSMETIC, PHONES, PORN, TOY } from '../constants/stock';
import { StockMultiplierMap } from '../config/config';

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
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const newStock = arrayShuffle(STOCK);
    const updatedStock = [];
    const numOfStocksToUpdate = randomInteger(4,6);
    for (let i = 0; i < numOfStocksToUpdate; i++) {
      const updateItem = newStock.pop();
      const min = StockMultiplierMap.get(updateItem.name).min;
      const max = StockMultiplierMap.get(updateItem.name).max;
      updateItem.price = Math.floor(updateItem.price * randomNumber(min, max));
      updatedStock.push(updateItem);
    }
    setStock(updatedStock);
  }, []);

  return stock;
};

export default useStockItems;