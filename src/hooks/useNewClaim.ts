import { useCallback } from 'react';
import { v4 as uuid4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { atomClaimsList } from '@/state/atoms';
import { Claim } from '@/interfaces/claims';
import { paths } from '@/Router';
import { sanitise } from '@/utils/functions';

const useNewClaim = () => {
  const [claimsList, setClaimsList] = useRecoilState(atomClaimsList);
  const navigate = useNavigate();

  const createNewClaim = useCallback(() => {
    const newClaim: Claim = {
      id: uuid4(),
      metadata: {
        createdAt: new Date().toISOString(),
        status: 'draft',
      },
      details: {
        first_name: '',
        last_name: '',
        state: '',
        is_not_cosmetic_claim: false,
        insurance_type: '',
        insurance_provider: '',
        date_of_claim_denial: '',
        claim_amount: '',
        reason_for_claim_denial: '',
        oon_emergency_service: '',
        oon_is_in_network_service: '',
        oon_is_signed_consent: '',
        consent_opt1: false,
        consent_opt2: false,
        consent_opt3: false,
        consent_opt4: false,
      },
    };
    const newClaimsList = [newClaim, ...claimsList];
    setClaimsList(newClaimsList);
    navigate(sanitise(paths.claimsDetails, { claimId: newClaim.id }));
  }, [claimsList]);

  return { createNewClaim };
};

export default useNewClaim;
