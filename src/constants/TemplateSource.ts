/*******************************************************************************
 * (C) Copyright
 * Logivations GmbH, Munich 2010-2022
 ******************************************************************************/

import childParentTemplate1 from '../assets/images/screenTemplates/childParent/1.svg';
import childParentTemplate2 from '../assets/images/screenTemplates/childParent/2.svg';
import childParentTemplate3 from '../assets/images/screenTemplates/childParent/3.svg';
import childParentTemplate4 from '../assets/images/screenTemplates/childParent/4.svg';

import screenTemplate1 from '../assets/images/screenTemplates/screenBuilder/1.svg';
import screenTemplate2 from '../assets/images/screenTemplates/screenBuilder/2.svg';
import screenTemplate3 from '../assets/images/screenTemplates/screenBuilder/3.svg';
import screenTemplate4 from '../assets/images/screenTemplates/screenBuilder/4.svg';
import screenTemplate5 from '../assets/images/screenTemplates/screenBuilder/5.svg';
import screenTemplate6 from '../assets/images/screenTemplates/screenBuilder/6.svg';
import screenTemplate7 from '../assets/images/screenTemplates/screenBuilder/7.svg';
import screenTemplate8 from '../assets/images/screenTemplates/screenBuilder/8.svg';
import screenTemplate9 from '../assets/images/screenTemplates/screenBuilder/9.svg';
import screenTemplate10 from '../assets/images/screenTemplates/screenBuilder/10.svg';
import screenTemplate11 from '../assets/images/screenTemplates/screenBuilder/11.svg';
import screenTemplate12 from '../assets/images/screenTemplates/screenBuilder/12.svg';

interface Config {
	ID: number;
	ImageSrc;
	numberOfTables?: number;
	splitScreenConfig;
}

const screenBuilderTemplates: Array<Config> = [
	{
		ID: 1,
		ImageSrc: screenTemplate1,
		numberOfTables: 3,
		splitScreenConfig: (tables) => {
			const [table1, table2, table3] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						table_name: 'original_table',
					},
					{ table_name: table1, tableKey: `${table1}-1-1` },
					{
						direction: 'vertical',
						elements: [
							{ table_name: table2, tableKey: `${table2}-1-2` },
							{ table_name: table3, tableKey: `${table3}-1-3` },
						],
					},
				],
			};
		},
	},
	{
		ID: 2,
		ImageSrc: screenTemplate2,
		numberOfTables: 4,
		splitScreenConfig: (tables) => {
			const [table1, table2, table3, table4] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						table_name: 'original_table',
					},
					{
						direction: 'vertical',
						elements: [
							{ table_name: table1, tableKey: `${table1}-2-1` },
							{ table_name: table2, tableKey: `${table2}-2-2` },
						],
					},
					{
						direction: 'vertical',
						elements: [
							{ table_name: table3, tableKey: `${table3}-2-3` },
							{ table_name: table4, tableKey: `${table4}-2-4` },
						],
					},
				],
			};
		},
	},
	{
		ID: 3,
		ImageSrc: screenTemplate3,
		numberOfTables: 3,
		splitScreenConfig: (tables) => {
			const [table1, table2, table3] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						table_name: 'original_table',
					},
					{
						direction: 'vertical',
						elements: [
							{ table_name: table1, tableKey: `${table1}-3-1` },
							{ table_name: table2, tableKey: `${table2}-3-2` },
						],
					},
					{ table_name: table3, tableKey: `${table3}-3-3` },
				],
			};
		},
	},
	{
		ID: 4,
		ImageSrc: screenTemplate4,
		numberOfTables: 3,
		splitScreenConfig: (tables) => {
			const [table1, table2, table3] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						direction: 'vertical',
						elements: [
							{
								table_name: 'original_table',
							},
							{ table_name: table1, tableKey: `${table1}-4-1` },
						],
					},
					{ table_name: table2, tableKey: `${table2}-4-2` },
					{ table_name: table3, tableKey: `${table3}-4-3` },
				],
			};
		},
	},
	{
		ID: 5,
		ImageSrc: screenTemplate5,
		numberOfTables: 2,
		splitScreenConfig: (tables) => {
			const [table1, table2] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						table_name: 'original_table',
					},
					{ table_name: table1, tableKey: `${table1}-5-1` },
					{ table_name: table2, tableKey: `${table2}-5-2` },
				],
			};
		},
	},
	{
		ID: 6,
		ImageSrc: screenTemplate6,
		numberOfTables: 1,
		splitScreenConfig: (tables) => {
			const [table1] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						table_name: 'original_table',
					},
					{ table_name: table1, tableKey: `${table1}-6-1` },
				],
			};
		},
	},
	{
		ID: 7,
		ImageSrc: screenTemplate7,
		numberOfTables: 3,
		splitScreenConfig: (tables) => {
			const [table1, table2, table3] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						direction: 'vertical',
						elements: [
							{
								table_name: 'original_table',
							},
							{ table_name: table1, tableKey: `${table1}-7-1` },
						],
					},
					{
						direction: 'vertical',
						elements: [
							{ table_name: table2, tableKey: `${table2}-7-2` },
							{ table_name: table3, tableKey: `${table3}-7-3` },
						],
					},
				],
			};
		},
	},
	{
		ID: 8,
		ImageSrc: screenTemplate8,
		numberOfTables: 2,
		splitScreenConfig: (tables) => {
			const [table1, table2] = tables;
			return {
				direction: 'vertical',
				elements: [
					{
						direction: 'horizontal',
						elements: [
							{
								table_name: 'original_table',
							},
							{ table_name: table1, tableKey: `${table1}-8-1` },
						],
					},
					{ table_name: table2, tableKey: `${table2}-8-2` },
				],
			};
		},
	},
	{
		ID: 9,
		ImageSrc: screenTemplate9,
		numberOfTables: 2,
		splitScreenConfig: (tables) => {
			const [table1, table2] = tables;
			return {
				direction: 'vertical',
				elements: [
					{
						table_name: 'original_table',
					},
					{
						direction: 'horizontal',
						elements: [
							{ table_name: table1, tableKey: `${table1}-9-1` },
							{ table_name: table2, tableKey: `${table2}-9-2` },
						],
					},
				],
			};
		},
	},
	{
		ID: 10,
		ImageSrc: screenTemplate10,
		numberOfTables: 1,
		splitScreenConfig: (tables) => {
			const [table1] = tables;
			return {
				direction: 'vertical',
				elements: [
					{
						table_name: 'original_table',
					},
					{ table_name: table1, tableKey: `${table1}-10-1` },
				],
			};
		},
	},
	{
		ID: 11,
		ImageSrc: screenTemplate11,
		numberOfTables: 2,
		splitScreenConfig: (tables) => {
			const [table1, table2] = tables;
			return {
				direction: 'horizontal',
				elements: [
					{
						table_name: 'original_table',
					},
					{
						direction: 'vertical',
						elements: [
							{ table_name: table1, tableKey: `${table1}-11-1` },
							{ table_name: table2, tableKey: `${table2}-11-2` },
						],
					},
				],
			};
		},
	},
	{
		ID: 12,
		ImageSrc: screenTemplate12,
		numberOfTables: 3,
		splitScreenConfig: (tables) => {
			const [table1, table2, table3] = tables;
			return {
				direction: 'vertical',
				elements: [
					{
						table_name: 'original_table',
					},
					{
						direction: 'horizontal',
						elements: [
							{ table_name: table1, tableKey: `${table1}-12-1` },
							{ table_name: table2, tableKey: `${table2}-12-2` },
							{ table_name: table3, tableKey: `${table3}-12-3` },
						],
					},
				],
			};
		},
	},
];

const childParentScreenTemplates: Array<Config> = [
	{
		ID: 13,
		ImageSrc: childParentTemplate3,
		splitScreenConfig: (table) => {
			return {
				direction: 'horizontal',
				elements: [{ table_name: 'original_table' }, { table_name: table, tableKey: `${table}-13-1` }],
			};
		},
	},
	{
		ID: 14,
		ImageSrc: childParentTemplate4,
		splitScreenConfig: (table) => {
			return {
				direction: 'vertical',
				elements: [{ table_name: 'original_table' }, { table_name: table, tableKey: `${table}-14-1` }],
			};
		},
	},
	{
		ID: 15,
		ImageSrc: childParentTemplate1,
		splitScreenConfig: (table) => {
			return {
				direction: 'horizontal',
				elements: [{ table_name: table, tableKey: `${table}-15-1` }, { table_name: 'original_table' }],
			};
		},
	},
	{
		ID: 16,
		ImageSrc: childParentTemplate2,
		splitScreenConfig: (table) => {
			return {
				direction: 'vertical',
				elements: [{ table_name: table, tableKey: `${table}-16-1` }, { table_name: 'original_table' }],
			};
		},
	},
];

export { childParentScreenTemplates, screenBuilderTemplates };
