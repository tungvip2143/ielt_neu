import * as React from 'react';
import { dataIlets } from "components/data/dataIelts";
import CardIlets from 'components/Card/CardIlets';


export interface  IeltsSectionsProps {
}

export default function IeltsSections (props:  IeltsSectionsProps) {
  return (
    <>
    {dataIlets.map(
            (item: { typeExam: string; timeExam: string; nameExam: string; image: string; hoverColor: string,path:string }) => (
              <CardIlets key={item.nameExam}  exam={item} />
            )
          )} 
    </>
  );
}
