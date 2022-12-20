import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { createCampaign, money } from '../assets'
import { CustomButton, FormField } from '../components'
import {checkIfImage} from '../utils'
import { useStateContext } from '../context'

export default function CreateCampaign() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {createCampaign} = useStateContext()
  const [form, setForm] = useState({

    name: '',
    title:'',
    description:'',
    target: '',
    deadline: '',
    image:''
  })

  const onChange = (fieldName, e)=>{
    setForm({...form, [fieldName]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 '>
        {loading && 'loader'}
        <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
          <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a Campaign</h1>
        </div>
        <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
            <FormField
              labelName='Your Name'
              placeholder='Roberto Athos'
              inputType='text'
              value={form.name}
              handleChange={(e)=>onChange('name', e)}
            />
            <FormField
              labelName='Campaign Title'
              placeholder='Write a Title'
              inputType='text'
              value={form.title}
              handleChange={(e)=>onChange('title', e)}
            />
        </div>
            <FormField
              labelName='Story'
              placeholder='Write your Story'
              isTextArea
              value={form.description}
              handleChange={(e)=>onChange('description', e)}
            />

            <div className='w-full flex justify-start items-center p-4 bg-blue-500 h-[120px] rounded-xl'>
              <img src={money} alt='money' className='w-[40px] h-[40px] object-contain'/>
              <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of the raised amount</h4>
            </div>

            <div className='flex flex-wrap gap-[40px]'>
            <FormField
              labelName='Goal *'
              placeholder='ETH 0.50'
              inputType='text'
              value={form.target}
              handleChange={(e)=>onChange('target', e)}
            />
            <FormField
              labelName='End Date'
              placeholder='End Date'
              inputType='date'
              value={form.deadline}
              handleChange={(e)=>onChange('deadline', e)}
            />
            <FormField
            labelName='Campaign Image'
            placeholder='Place image url of your campaign'
            inputType='url'
            value={form.image}
            handleChange={(e)=>onChange('image', e)}
          />

            <div className='flex justify-center items-center mt-[40px]'>
              <CustomButton
                btnType="submit"
                title="submit new campaign"
                styles= "bg-blue-500 hover:bg-blue-700"
              />
            </div>
        </div>
        </form>
    </div>
  )
}
