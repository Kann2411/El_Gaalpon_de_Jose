// import { User } from './../users/users.entity';
// import { BadRequestException, Injectable } from '@nestjs/common';
// import { Payment, Preference, MerchantOrder, PaymentRefund } from 'mercadopago';
// import { UsersService } from '../users/users.service';
// import { UsersRepository } from '../users/users.repository';
// import { Repository } from 'typeorm';
// import { Pago } from './pago.entity';

// @Injectable()
// export class MercadopagoService {
//     constructor(
//         private readonly usersRepository: Repository<User>,
//         private readonly mercadoPagoRepository: Repository<Pago>,
//     ) { }
//     async create(body) {
//         try {
//             const user: User = await this.usersRepository.findOneBy(body.user);

//             if (!user || !user.id) {
//                 throw new BadRequestException('User not found');
//             }
//             //   const productsArr = await this.productsService.findManyByIds(
//             //     body.products.map(({ id }) => id),
//             //   );

//             const productsForPreference = productsArr.map((product) => {
//                 const prodReq = body.products.find(({ id }) => id === product.id);
//                 if (!prodReq) {
//                     throw new BadRequestException(
//                         `Product by id equal ${product.id} not found`,
//                     );
//                 }
//                 if (!prodReq.quantity) {
//                     throw new BadRequestException(
//                         `Quantity of product by id equal ${product.id} is required`,
//                     );
//                 }
//                 if (!product) {
//                     throw new BadRequestException(
//                         `Product by id equal ${prodReq.id} not found`,
//                     );
//                 }
//                 if (product.stock < prodReq.quantity) {
//                     throw new BadRequestException(
//                         `Product by id equal ${product.id} out of stock`,
//                     );
//                 }
//                 return {
//                     id: product.id,
//                     title: product.name,
//                     quantity: prodReq.quantity,
//                     unit_price: product.price,
//                     currency_id: 'ARS',
//                     category_id: product.categoryId,
//                 };
//             });
//             const productForOrder = productsArr.map((product) => {
//                 const prodReq = body.products.find(
//                     ({ id }) => id === product.id,
//                 ) as any;
//                 return {
//                     productId: product.id,
//                     quantity: prodReq.quantity,
//                     price: product.price,
//                 };
//             });

//             const orderId = await this.ordersService.create({
//                 userId: user.id,
//                 products: productForOrder,
//             });

//             const orderBody = {
//                 body: {
//                     items: productsForPreference,
//                     payer: {
//                         email: user.email,
//                         id: user.id,
//                     },
//                     notification_url: `${HOST}/mercadopago/webhook`,
//                     metadata: {
//                         userId: user.id,
//                         email: user.email,
//                         orderId,
//                     },
//                 },
//             };

//             const preference = await new Preference(mpClient).create(orderBody);
//             return preference;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async webhook(body: any) {
//         if (body.data) {
//             const payment: any = await new Payment(mpClient).get(body.data);
//             console.log(payment.id);
//             const products = payment.additional_info.items;
//             const metadata = payment.metadata;
//             if (payment.status == 'approved') {
//                 const productsData = await this.productsService.findManyByIds(
//                     products.map((product: { id: any }) => product.id),
//                 );

//                 products.forEach(async (product: { id: any; quantity: any }) => {
//                     const productDb = productsData.find((prod) => prod.id === product.id);
//                     if (!productDb || productDb.stock < product.quantity) {
//                         try {
//                             await new PaymentRefund(mpClient).create({
//                                 payment_id: payment.id,
//                                 body: {},
//                             });

//                             const updatePaymentObject = {
//                                 mpOrder: payment.order.id,
//                                 paid: false,
//                                 status: 'refound',
//                                 order: metadata.order_id,
//                             };

//                             await this.ordersService.updateToPayment(updatePaymentObject);

//                             throw new BadRequestException('Stock insuficient');
//                         } catch (error) { }
//                     }
//                 });

//                 products.forEach(async (product: { id: any; quantity: any }) => {
//                     const productDb = productsData.find((prod) => prod.id === product.id);
//                     if (productDb) {
//                         await this.productsService.updateStock(
//                             -product.quantity,
//                             product.id,
//                         );
//                     }
//                 });

//                 const updatePaymentObject = {
//                     mpOrder: payment.order.id,
//                     paid: true,
//                     status: 'paid',
//                     order: metadata.order_id,
//                 };

//                 const dbResponse = await this.ordersService.updateToPayment(updatePaymentObject);

//                 return dbResponse;
//             }

//             if (payment.status === 'rejected') {
//                 console.log('fallo el pago')
//                 const updatePaymentObject = {
//                     mpOrder: payment.order.id,
//                     paid: false,
//                     status: 'cancelled',
//                     order: metadata.order_id,
//                 };

//                 return await this.ordersService.updateToPayment(updatePaymentObject);
//             }
//         }
//     }
// }