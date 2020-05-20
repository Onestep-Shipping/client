import CREATE_BOOKING_REQUEST from '../../../apollo/mutations/CreateBookingRequestMutation.js';
import CREATE_BILL_INSTRUCTION from '../../../apollo/mutations/CreateBillInstructionMutation.js';

const handleBookingRequest = (form, scheduleId, quoteId) => {
  const bookingRequest = (createBookingRequestFromForm(form));
  const variables = { 
    companyId: "5ebb4f56b6a43ab1f1500127",
    scheduleId, 
    quoteId,
    bookingRequest
  }
  return { 
    mutation: CREATE_BOOKING_REQUEST, variables 
  }
};

const createBookingRequestFromForm = form => {
  const { commodity, hsCode, quantity, containerType, paymentTerm, autoFilling } = form;
  const quantities = getValuesOfNodeList(quantity);
  const containerTypes = getValuesOfNodeList(containerType);

  const containers = [];
  for (let i = 0; i < quantities.length; i++) {
    containers.push({ 
      containerType: containerTypes[i], 
      quantity: parseInt(quantities[i]) 
    })
  }

  return {
    commodity: commodity.value,
    hsCode: hsCode.value,
    containers,
    paymentTerm: paymentTerm.value,
    autoFilling: autoFilling.value === "Yes",
  }
};

const handleBillInstruction = (form, shipmentId) => {
  const billInstruction = (createBillInstructionFromForm(form));
  const variables = {
    shipmentId,
    billInstruction
  }
  return { 
    mutation: CREATE_BILL_INSTRUCTION, variables 
  }
};

const createBillInstructionFromForm = form => {
  console.log(form);
  const { 
    shipper, consignee, notify, descriptionOfGoods,
    containerNo, seelNo, cargoWeight, measurement, vGM,
    orderPONumber, hSCode, cAEDAESNumber, cargoValue
  } = form;
  
  const containerNos = getValuesOfNodeList(containerNo);
  const seelNos = getValuesOfNodeList(seelNo);
  const cargoWeights = getValuesOfNodeList(cargoWeight);
  const measurements = getValuesOfNodeList(measurement);
  const vgms = getValuesOfNodeList(vGM);

  const containers = [];
  for (let i = 0; i < containerNos.length; i++) {
    containers.push({ 
      containerNo: containerNos[i],
      seelNo: seelNos[i],
      weight: parseFloat(cargoWeights[i]),
      measurement: parseFloat(measurements[i]),
      vgm: parseFloat(vgms[i]),
    })
  }

  return {
    shipper: shipper.value,
    consignee: consignee.value,
    notify: notify.value,
    description: descriptionOfGoods.value,
    containers,
    orderNo: orderPONumber.value,
    hsCode: hSCode.value,
    caedNo: cAEDAESNumber.value,
    cargoValue: cargoValue.value
  }
}

const getValuesOfNodeList = potentialList => {
  const result = [];
  if (potentialList.value === "") { // has a list of values
    potentialList.forEach(input => {
      if (input.value !== "") {
        result.push(input.value);
      }
    });
  } else { // only has one value
    result.push(potentialList.value);
  }
  return result;
}

export { handleBookingRequest, handleBillInstruction }