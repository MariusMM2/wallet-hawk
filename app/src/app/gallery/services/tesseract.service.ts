import {Injectable} from '@angular/core';
import {createWorker} from 'tesseract.js';
import {PartialObserver} from 'rxjs';
import {TesseractMessage} from '../types/tesseractMessage';
import {BudgetItem} from '../../core/models';
import {TesseractUtils} from '../../shared/utilities/tesseract.utils';


@Injectable({
    providedIn: 'root'
})
export class TesseractService {
    /**
     *
     * @param imageFile
     * @param progressChanges
     */
    async getBudgetItems(imageFile: File, progressChanges: PartialObserver<TesseractMessage | null> = null): Promise<Array<Partial<BudgetItem>>> {
        const result = await this.recognizeImage(imageFile, progressChanges);
        return TesseractUtils.getBudgetItems(result);
    }

    private async recognizeImage(imageFile, progressChanges: PartialObserver<TesseractMessage> = null): Promise<string> {
        const worker = createWorker({
            logger(m: TesseractMessage) {
                progressChanges?.next(m);
            },
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {data: {text}} = await worker.recognize(imageFile);
        await worker.terminate();

        progressChanges?.complete();

        return text;
    }
}
