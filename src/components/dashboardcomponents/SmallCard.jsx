import React from 'react';
import { threeDotIcon } from "../../assets/icons";
import { MoveUpRightIcon, MoveDownRightIcon } from "lucide-react";

const SmallCard = ({  title, number, boxnum, type ,icon,key}) => {
  return (
    <div className='text-black bg-gray-200 py-5 px-12 rounded-lg max-w-[345px]'>
      <div className="upper flex items-center justify-between">
        <div className='items-center flex gap-2'>{icon()}
        <p className='text-sm ml'>{title}</p>
        </div>
        
        <div className=''>{threeDotIcon()}</div>
      </div>
      <div className="lower flex items-center mt-4">
        <p className='text-2xl'>{number}</p>
        {type === "profit" ? (
          <div className="box ml-2 p-[2px] rounded-sm text-xs bg-CustomBgSuccessGreen  text-customCardGreenText items-center flex">
            {boxnum}
            <MoveUpRightIcon color='#14CA74' size={12} className='ml-1' />
          </div>
        ) : (
          type === "loss" && (
            <div className="box ml-2 p-[2px] rounded-sm text-xs bg-CustomBgDangerRed text-customCardRedText items-center flex">
              {boxnum}
              <MoveDownRightIcon color='#FF5A65' size={12} className='mr-1'/>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SmallCard;
