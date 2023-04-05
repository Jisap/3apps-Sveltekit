<script lang="ts">
    import type { Quiz, Question, Option } from '../../../types';
    import QuestionButton from './components/QuestionButton.svelte';
    import QuestionOption from './components/QuestionOption.svelte';
    import QuestionText from './components/QuestionText.svelte';
    import { answers, type Answer } from '../../../store'; // Estado Answer[] {id, isCorrect}
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import QuestionProgressCircle from './components/QuestionProgressCircle.svelte';

    export let data: Quiz;                              //Data de la card seleccionada
    
    let currentQuestionIndex = 0;
    let answersValue: Answer[];                         // Instancia del estado Answer[]
    let selectedOption: null | string = null;           // Estado para opción seleccionada string
    let showCorrectAnswer = false;

    const handleChangeOption = ( label:string ) => {    // Da valor a opción seleccionada.
        selectedOption = label
    }

    const handleNext = () => {
    showCorrectAnswer = false;
    selectedOption = null;
    if (currentQuestionIndex === data.questions.length - 1) {
      goto("/results");
    } else {
      currentQuestionIndex++;
    }
  };

    const handleSubmit = () => {
        if(!selectedOption) return;
        showCorrectAnswer = true;
        answers.update((currentState) => {              // Estado Answer[] se actualiza con el valor de la opcion seleccionada.
            const updateAnswerState = currentState;             
            updateAnswerState[currentQuestionIndex].isCorrect = selectedOption === question.answer; // Actualizamos el valor de isCorrect
            console.log(updateAnswerState)
            return updateAnswerState                    // Retornamos como estado actualizado de Answer[] con la nueva opción seleccionada y si es o no correcto
        
        })
    }

    answers.subscribe((value) => {
        answersValue = value                             // Actualización del estado despues de hacer submit
    });

    $: question = data.questions[currentQuestionIndex]  // Data de la card seleccionada en su pregunta nº1

    onMount(() => {                                     // Inicializamos la store de answers[] con sus propiedades id e isCorrect=null
        answers.set(
            data.questions.map((question: any) => {
                return {
                    id: question.id,
                    isCorrect: null,
                };
            })
        );
  });
   
</script>



<div class="w-full">

    <div class="flex justify-center">
        {#each answersValue as answer}
            <QuestionProgressCircle isCorrect={answer.isCorrect} />
        {/each}
  </div>
    
    <QuestionText text={question.question}/>

    <div class="flex justify-between flex-wrap cursor-pointer">
        {#each question.options as option (option.id)}
            <QuestionOption 
                { option } 
                {selectedOption}
                {handleChangeOption}  
                {showCorrectAnswer}  
                answer = { question.answer }
            />
        {/each}
    </div>

    <QuestionButton { handleSubmit } { showCorrectAnswer } { handleNext }/>
</div>