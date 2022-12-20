import React,{useState, useEffect} from 'react'
import {useStateContext} from '../context'
import DisplayCampaigns from '../components/DisplayCampaigns'

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaign } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaign();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <DisplayCampaigns 
    title="All Campaigns"
    isLoading={isLoading}
    campaigns={campaigns}
  />
  )
}
