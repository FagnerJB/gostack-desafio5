import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionInterface {
   title: string
   value: number
   type: "income" | "outcome"
}

class CreateTransactionService {
   private transactionsRepository: TransactionsRepository;

   constructor(transactionsRepository: TransactionsRepository) {
      this.transactionsRepository = transactionsRepository;
   }

   public execute({ title, value, type }: TransactionInterface): Transaction {

      return this.transactionsRepository.create({
         title,
         value,
         type
      })

   }
}

export default CreateTransactionService;
