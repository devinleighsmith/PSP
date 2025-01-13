import { PayeeOption } from '../../acquisition/models/PayeeOptionModel';
import { ApiGen_Concepts_CompReqPayee } from './../../../../models/api/generated/ApiGen_Concepts_CompReqPayee';

export class CompensationPayeeFormModel {
  payeeKey = '';

  constructor(readonly compensationRequisitionId: number) {
    this.compensationRequisitionId = compensationRequisitionId;
  }

  static fromApi(apiModel: ApiGen_Concepts_CompReqPayee): CompensationPayeeFormModel {
    const payeeModel = new CompensationPayeeFormModel(apiModel.compReqPayeeId);

    payeeModel.payeeKey = PayeeOption.getKeyFromPayee(apiModel);

    return payeeModel;
  }
}
