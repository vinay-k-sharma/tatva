import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { FaEye } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
export default function DashboardStatsGrid({productsCount,usersCount,ordersCount,categoriesCount}) {
	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<MdCategory className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Categories</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{categoriesCount}</strong>
						<span className="text-sm text-green-500 pl-2">+5</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{ordersCount}</strong>
						<span className="text-sm text-green-500 pl-2">-2</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{usersCount}</strong>
						<span className="text-sm text-green-500 pl-2">+3</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Products</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{productsCount}</strong>
						<span className="text-sm text-red-500 pl-2">-3</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}
// best practice to stop repeating same styles again and again
function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}