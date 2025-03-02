import React, { ReactElement } from 'react';
import { _actionMap, _keyMapDefaults } from '../controls/maps';
import {
  MainControls,
  sendCommandString,
  readGetOneAndToss,
  readGetOneAndReturnOne,
} from '../controls/mainControls';

export async function getId() {
  await sendCommandString('CML C0');
  const { value } = await MainControls.lineReader.read().catch(console.error);
  const chordCountSplit = await value.split(' ');
  const chordCountParsedValue = parseInt(
    chordCountSplit[chordCountSplit.length - 1],
  );

  await sendCommandString('ID');
  MainControls._chordmapId = await readGetOneAndReturnOne();

  await sendCommandString('VERSION');
  MainControls._firmwareVersion = await readGetOneAndReturnOne();

  console.log(
    'Just got here ' +
      MainControls._chordmapId +
      ' ' +
      MainControls._firmwareVersion,
  );
  const element: HTMLElement = document.getElementById(
    'statusDiv',
  ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
  const splitVersion = MainControls._firmwareVersion.split(' ');
  const splitFirmware = MainControls._chordmapId.split(' ');
  element.innerHTML =
    'Device ' +
    MainControls._chordmapId +
    ' --- CCOS ' +
    MainControls._firmwareVersion;
}

async function readVersion() {
  await readGetOneAndToss(); //electronics board version
  const { value, done } = await MainControls.lineReader.read();
  if (value) {
    MainControls._firmwareVersion = value;
    console.log('firmware version is ' + MainControls._firmwareVersion);
  }
  await readGetOneAndToss(); //serial api version
}
async function readDeviceId() {
  // await cancelReader();
  // let decoder = new TextDecoderStream();
  // let inputDone = serialPort.readable.pipeTo(decoder.writable);
  // console.log(inputDone);
  // let inputStream = decoder.readable.pipeThrough(
  //   new TransformStream(new LineBreakTransformer())
  // );
  // lineReader = inputStream.getReader();
  // console.log(lineReader);

  // await readProcess(linecount);
  // console.log('cancelling reader');
  // await lineReader.cancel().then(()=>{console.log('then cancelled line reader');});
  // await inputDone.catch(() => {});
  // await inputDone;
  const { value, done } = await MainControls.lineReader.read();
  if (value) {
    if (value == 'chordmaps loaded and ready') {
      console.log(
        'received: chordmaps loaded and ready, so the chord headers are enabled; turning this off',
      );
      await sendCommandString(
        'SET ' + MainControls.CONFIG_ID_ENABLE_SERIAL_CHORD + ' 00',
      ); //disable chordmap outout
      await sendCommandString('ID');
      await readDeviceId();
    } else {
      MainControls._chordmapId = value;

      console.log(MainControls._chordmapId);
    }
  }
}
export function GetID(): ReactElement {
  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        color="pink"
        onClick={() => getId()}
      >
        Get ID{' '}
      </button>
    </React.Fragment>
  );
}
