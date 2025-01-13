import { InterestHolderType } from '@/constants/interestHolderTypes';
import { ApiGen_Concepts_AcquisitionFileOwner } from '@/models/api/generated/ApiGen_Concepts_AcquisitionFileOwner';
import { ApiGen_Concepts_AcquisitionFileTeam } from '@/models/api/generated/ApiGen_Concepts_AcquisitionFileTeam';
import { ApiGen_Concepts_CompensationRequisition } from '@/models/api/generated/ApiGen_Concepts_CompensationRequisition';
import { ApiGen_Concepts_CompReqPayee } from '@/models/api/generated/ApiGen_Concepts_CompReqPayee';
import { ApiGen_Concepts_InterestHolder } from '@/models/api/generated/ApiGen_Concepts_InterestHolder';
import { ApiGen_Concepts_LeaseStakeholder } from '@/models/api/generated/ApiGen_Concepts_LeaseStakeholder';
import { getEmptyBaseAudit } from '@/models/defaultInitializers';
import { exists } from '@/utils';
import { formatApiPersonNames } from '@/utils/personUtils';

import { PayeeType } from './PayeeTypeModel';

export class PayeeOption {
  public readonly payee_api_id: number | null;
  public readonly api_id: number;
  public readonly text: string;
  public readonly fullText: string;
  public readonly value: string;
  public readonly payeeType: PayeeType;

  private constructor(
    payee_api_id: number | null,
    api_id: number,
    name: string,
    key: string,
    value: string,
    payeeType: PayeeType,
  ) {
    this.payee_api_id = payee_api_id;
    this.api_id = api_id;
    this.fullText = `${name} (${key})`;
    this.text = `${PayeeOption.truncateName(name)} (${key})`;
    this.value = value;
    this.payeeType = payeeType;
  }
  public static getKeyFromPayee(apiModel: ApiGen_Concepts_CompReqPayee): string {
    if (apiModel.acquisitionOwnerId) {
      return PayeeOption.generateKey(apiModel.acquisitionOwnerId, PayeeType.Owner);
    }

    if (apiModel.acquisitionFileTeamId) {
      return PayeeOption.generateKey(apiModel.acquisitionFileTeamId, PayeeType.AcquisitionTeam);
    }

    if (apiModel.interestHolderId) {
      if (
        apiModel.interestHolder?.interestHolderType?.id === InterestHolderType.OWNER_REPRESENTATIVE
      ) {
        return PayeeOption.generateKey(apiModel.interestHolderId, PayeeType.OwnerRepresentative);
      } else if (
        apiModel.interestHolder?.interestHolderType?.id === InterestHolderType.OWNER_SOLICITOR
      ) {
        return PayeeOption.generateKey(apiModel.interestHolderId, PayeeType.OwnerSolicitor);
      } else {
        return PayeeOption.generateKey(apiModel.interestHolderId, PayeeType.InterestHolder);
      }
    }

    return '';
  }

  public static getKeyFromLeaseStakeholder(apiModel: ApiGen_Concepts_LeaseStakeholder): string {
    return PayeeOption.generateKey(apiModel.leaseStakeholderId, PayeeType.LeaseStakeholder);
  }

  public static getKeyFromLegacyPayee(compReqId: number): string {
    return PayeeOption.generateKey(compReqId, PayeeType.LegacyPayee);
  }

  public static fromApi(compReqPayee: ApiGen_Concepts_CompReqPayee): PayeeOption {
    if (compReqPayee.acquisitionOwnerId) {
      return PayeeOption.createOwner(
        compReqPayee.acquisitionOwner,
        compReqPayee.compensationRequisitionId,
      );
    } else if (compReqPayee.acquisitionFileTeamId) {
      return PayeeOption.createTeamMember(
        compReqPayee.acquisitionFileTeam,
        compReqPayee.compensationRequisitionId,
      );
    } else if (compReqPayee.interestHolderId) {
      return PayeeOption.createInterestHolder(
        compReqPayee.interestHolder,
        compReqPayee.compensationRequisitionId,
      );
    }
  }

  public toApi(): ApiGen_Concepts_CompReqPayee {
    const compReqPayeeModel: ApiGen_Concepts_CompReqPayee = {
      compensationRequisitionId: null,
      compensationRequisition: null,
      acquisitionOwnerId: null,
      acquisitionOwner: null,
      interestHolderId: null,
      interestHolder: null,
      acquisitionFileTeamId: null,
      acquisitionFileTeam: null,
      compReqPayeeId: null,
      ...getEmptyBaseAudit(),
    };

    switch (this.payeeType) {
      case PayeeType.AcquisitionTeam:
        compReqPayeeModel.acquisitionFileTeamId = this.api_id;
        break;
      case PayeeType.OwnerRepresentative:
      case PayeeType.OwnerSolicitor:
      case PayeeType.InterestHolder:
        compReqPayeeModel.interestHolderId = this.api_id;
        break;
      case PayeeType.Owner:
        compReqPayeeModel.acquisitionOwnerId = this.api_id;
        break;
    }

    return compReqPayeeModel;
  }

  private static truncateName(name: string): string {
    if (name.length > 50) {
      return name.slice(0, 50) + '...';
    } else {
      return name;
    }
  }

  public static createOwner(
    model: ApiGen_Concepts_AcquisitionFileOwner,
    compReqPayeeId: number | null,
  ): PayeeOption {
    const name = model.isOrganization
      ? `${model.lastNameAndCorpName}, Inc. No. ${model.incorporationNumber} (OR Reg. No. ${model.registrationNumber})`
      : [model.givenName, model.lastNameAndCorpName, model.otherName].filter(x => !!x).join(' ');

    return new PayeeOption(
      compReqPayeeId,
      model.id || 0,
      name,
      'Owner',
      PayeeOption.generateKey(model.id, PayeeType.Owner),
      PayeeType.Owner,
    );
  }

  public static createOwnerSolicitor(
    model: ApiGen_Concepts_InterestHolder,
    compReqPayeeId: number | null,
  ): PayeeOption {
    let name = '';
    if (model.person) {
      name = formatApiPersonNames(model.person);
    } else {
      name = model.organization?.name || '';
    }
    return new PayeeOption(
      compReqPayeeId,
      model.interestHolderId || 0,
      name,
      `Owner's Solicitor`,
      PayeeOption.generateKey(model.interestHolderId, PayeeType.OwnerSolicitor),
      PayeeType.OwnerSolicitor,
    );
  }

  public static createOwnerRepresentative(
    model: ApiGen_Concepts_InterestHolder,
    compReqPayeeId: number | null,
  ): PayeeOption {
    const name = formatApiPersonNames(model.person);
    return new PayeeOption(
      compReqPayeeId,
      model.interestHolderId || 0,
      name,
      `Owner's Representative`,
      PayeeOption.generateKey(model.interestHolderId, PayeeType.OwnerRepresentative),
      PayeeType.OwnerRepresentative,
    );
  }

  public static createTeamMember(
    model: ApiGen_Concepts_AcquisitionFileTeam,
    compReqPayeeId: number | null,
  ): PayeeOption {
    let name = '';
    if (model.person) {
      name = formatApiPersonNames(model.person);
    } else {
      name = model.organization?.name || '';
    }
    return new PayeeOption(
      compReqPayeeId,
      model.id || 0,
      name,
      model.teamProfileType?.description ?? '',
      PayeeOption.generateKey(model.id, PayeeType.AcquisitionTeam),
      PayeeType.AcquisitionTeam,
    );
  }

  public static createInterestHolder(
    model: ApiGen_Concepts_InterestHolder,
    compReqPayeeId: number | null,
  ): PayeeOption {
    if (model.interestHolderType?.id === InterestHolderType.OWNER_SOLICITOR) {
      return this.createOwnerSolicitor(model, compReqPayeeId);
    } else if (model.interestHolderType?.id === InterestHolderType.OWNER_REPRESENTATIVE) {
      return this.createOwnerRepresentative(model, compReqPayeeId);
    }

    let name = '';
    if (model.person) {
      name = formatApiPersonNames(model.person);
    } else {
      name = model.organization?.name || '';
    }

    // The interest holders should always have a property
    const typeDescription =
      exists(model.interestHolderProperties) && model.interestHolderProperties.length > 0
        ? exists(model.interestHolderProperties[0].propertyInterestTypes) &&
          model.interestHolderProperties[0].propertyInterestTypes.length > 0
          ? model.interestHolderProperties[0].propertyInterestTypes[0].description
          : 'ERROR: Missing interest type'
        : 'ERROR: Missing interest holder';

    return new PayeeOption(
      null,
      model.interestHolderId || 0,
      name,
      `${typeDescription}`,
      PayeeOption.generateKey(model.interestHolderId, PayeeType.InterestHolder),
      PayeeType.InterestHolder,
    );
  }

  public static createLegacyPayee(
    model: ApiGen_Concepts_CompensationRequisition,
    compReqPayeeId: number | null,
  ): PayeeOption {
    return new PayeeOption(
      compReqPayeeId,
      model.id || 0,
      model.legacyPayee || '',
      'Legacy free-text value',
      PayeeOption.generateKey(model.id, PayeeType.LegacyPayee),
      PayeeType.LegacyPayee,
    );
  }

  public static generateKey(modelId: number | null | undefined, payeeType: PayeeType) {
    return `${payeeType}-${modelId}`;
  }
}
