import { isValid, parse } from 'date-fns';
import { Well } from 'pages/Wells/types';

export const wellDefaultValues = {
  cep: '',
  mapLink: '',
  city: {
    id: '',
    name: '',
    uf: '',
  },
  cityId: '',
  client: {
    contactName: '',
    contactPhone: '',
    cpfCnpj: '',
    id: '',
    name: '',
    tenantId: '',
  },
  clientName: '',
  deliveryDate: '',
  distric: '',
  dynamicLevel: 0,
  latitude: '',
  longitude: '',
  number: '',
  proposalId: '',
  proposalServiceId: '',
  sedimentaryDepth: 0,
  sieveDepth: 0,
  staticLevel: 0,
  street: '',
  id: '',
  totalDepth: 0,
  voltage: 'V110',
  zipcode: '',
};

export const isWellValid = (well: Well): boolean => {
  if (
    !well.deliveryDate ||
    !isValid(parse(well.deliveryDate, 'dd/MM/yyyy', new Date())) ||
    !well.staticLevel ||
    well.staticLevel === 0 ||
    !well.dynamicLevel ||
    well.dynamicLevel === 0 ||
    !well.sedimentaryDepth ||
    well.sedimentaryDepth === 0 ||
    !well.sieveDepth ||
    well.sieveDepth === 0 ||
    !well.totalDepth ||
    well.totalDepth === 0
  )
    return false;

  return true;
};
