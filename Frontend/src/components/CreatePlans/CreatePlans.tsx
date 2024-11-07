"use client";
import { useState } from "react";
import { Membership } from "@/interfaces/interfaces";
import { createMembresia } from "../../lib/server/fetchMembresias";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";

interface CreateMembershipFormProps {
  onMembershipCreated?: (membership: Membership) => void;
}

export default function CreatePlans({
  onMembershipCreated,
}: CreateMembershipFormProps) {
  const [benefits, setBenefits] = useState<string[]>([]);

  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState("ARS");
  const [description, setDescription] = useState("");
  const [idealFor, setIdealFor] = useState("");

  const validationSchema = Yup.object().shape({
    plan: Yup.string().required("Plan name is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive number"),
    currency: Yup.string().required("Currency is required"),
    description: Yup.string().required("Description is required"),
    idealFor: Yup.string().required("Ideal For is required"),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const newMembership: Omit<Membership, "id"> = {
      plan: values.plan,
      price: values.price,
      currency: values.currency,
      description: values.description,
      benefits,
      idealFor: values.idealFor,
    };

    try {
      const createdMembership = await createMembresia(newMembership);
      if (createdMembership && onMembershipCreated) {
        onMembershipCreated(createdMembership);
      }
      Swal.fire({
        title: "Success!",
        text: "Membership created successfully!",
        icon: "success",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton:
            "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
      resetForm();
    } catch (error) {
      console.error("Error creating membership:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue creating the membership.",
        icon: "error",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton:
            "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      plan: '',
      price: 0,
      currency: 'ARS',
      description: '',
      idealFor: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const newMembership: Omit<Membership, 'id'> = {
        ...values,
        benefits,
      };

      try {
        const createdMembership = await createMembresia(newMembership);
        if (createdMembership && onMembershipCreated) {
          onMembershipCreated(createdMembership);
        }
        Swal.fire({
          title: 'Success!',
          text: 'Membership created successfully!',
          icon: 'success',
          customClass: {
            popup: 'bg-black text-white',
            title: 'text-red-600',
            confirmButton: 'bg-red-600 text-white hover:bg-red-700',
          },
          buttonsStyling: false,
        });
        resetForm();
        setBenefits([]);
      } catch (error) {
        console.error('Error creating membership:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue creating the membership.',
          icon: 'error',
          customClass: {
            popup: 'bg-black text-white',
            title: 'text-red-600',
            confirmButton: 'bg-red-600 text-white hover:bg-red-700',
          },
          buttonsStyling: false,
        });
      }
    },
  });

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-black text-white flex flex-col items-center p-6"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Create Membership <span className="text-red-600">Plan</span>
        </h1>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={formik.values.plan}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="plan"
          placeholder="Plan Name"
          className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
        />
        {formik.touched.plan && formik.errors.plan && (
          <div className="text-red-500 text-sm">{formik.errors.plan}</div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="price"
          placeholder="Price"
          className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
        />
        {formik.touched.price && formik.errors.price && (
          <div className="text-red-500 text-sm">{formik.errors.price}</div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={formik.values.currency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="currency"
          placeholder="Currency"
          className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
        />
        {formik.touched.currency && formik.errors.currency && (
          <div className="text-red-500 text-sm">{formik.errors.currency}</div>
        )}
      </div>

      <div className="mb-4">
        <textarea
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="description"
          placeholder="Description"
          className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm">
            {formik.errors.description}
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={formik.values.idealFor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="idealFor"
          placeholder="Ideal For"
          className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
        />
        {formik.touched.idealFor && formik.errors.idealFor && (
          <div className="text-red-500 text-sm">{formik.errors.idealFor}</div>
        )}
      </div>

      <h4 className="mb-4">Benefits</h4>
      {benefits.map((benefit, index) => (
        <div key={index} className="mb-2">
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Create Membership Plan</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="plan" className="block text-sm font-medium mb-1 text-red-400">Plan Name</label>
            <input
              id="plan"
              type="text"
              placeholder='Plan Name'
              {...formik.getFieldProps('plan')}
              className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {formik.touched.plan && formik.errors.plan && <div className="text-red-500 text-xs mt-1">{formik.errors.plan}</div>}
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1 text-red-400">Price</label>
            <input
              id="price"
              type="number"
              {...formik.getFieldProps('price')}
              className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {formik.touched.price && formik.errors.price && <div className="text-red-500 text-xs mt-1">{formik.errors.price}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="currency" className="block text-sm font-medium mb-1 text-red-400">Currency</label>
          <input
            id="currency"
            type="text"
            {...formik.getFieldProps('currency')}
            className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {formik.touched.currency && formik.errors.currency && <div className="text-red-500 text-xs mt-1">{formik.errors.currency}</div>}
        </div>
      ))}
      <button type="button" onClick={addBenefit} className="text-blue-500 mb-4">
        Add Benefit
      </button>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Create Plan
        </button>
      </div>
    </form>
        <div>
          <label htmlFor="description"  className="block text-sm font-medium mb-1 text-red-400">Description</label> 
          <textarea
            id="description"
            placeholder='Describes the membership'
            {...formik.getFieldProps('description')}
            rows={3}
            className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {formik.touched.description && formik.errors.description && <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>}
        </div>
        <div>
          <label htmlFor="idealFor" className="block text-sm font-medium mb-1 text-red-400">Ideal For</label>
          <input
            id="idealFor"
            type="text"
            placeholder='Membership is ideal for...'
            {...formik.getFieldProps('idealFor')}
            className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {formik.touched.idealFor && formik.errors.idealFor && <div className="text-red-500 text-xs mt-1">{formik.errors.idealFor}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-red-400">Benefits</label>
          {benefits.map((benefit, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder="Benefit"
                className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={addBenefit} 
            className="mt-2 text-red-400 hover:text-red-300 transition-colors duration-200"
          >
            + Add Benefit
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <button 
            type="submit" 
            className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
          >
            Create Membership Plan
          </button>
        </div>
      </form>
    </div>
  );
}